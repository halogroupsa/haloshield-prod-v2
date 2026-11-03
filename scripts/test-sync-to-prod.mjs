import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const script = fileURLToPath(new URL("./sync-to-prod.sh", import.meta.url));
const write = (directory, path, value) => {
  const file = join(directory, path);
  mkdirSync(join(file, ".."), { recursive: true });
  writeFileSync(file, value);
};
const git = (directory, ...args) => {
  const result = spawnSync("git", ["-C", directory, ...args], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
};

test("production sync previews, preserves local config, deletes stale code and protects dirty checkouts", () => {
  const fixture = mkdtempSync(join(tmpdir(), "halo-sync-"));
  const source = join(fixture, "staging checkout");
  const target = join(fixture, "production checkout");
  mkdirSync(source);
  mkdirSync(target);
  try {
    for (const directory of [source, target]) git(directory, "init", "--quiet");
    write(source, "package.json", '{"name":"fixture"}\n');
    write(source, "src/app/page.tsx", "new application\n");
    write(source, ".gitignore", ".env\nnode_modules/\n");
    write(source, ".env.example", "NEXT_PUBLIC_SITE_URL=https://haloshield.ae\n");
    write(source, ".env", "staging-only\n");
    write(source, "wrangler.toml", 'name = "staging"\n');
    write(target, ".gitignore", ".env\nnode_modules/\n");
    write(target, "src/stale.ts", "obsolete\n");
    write(target, "wrangler.toml", 'name = "production"\n');
    write(target, ".env", "production-only\n");
    write(target, "node_modules/local.txt", "preserved dependency\n");
    git(target, "add", ".");
    git(target, "-c", "user.name=Sync Test", "-c", "user.email=sync-test@example.invalid", "commit", "--quiet", "-m", "fixture");
    const gitConfig = readFileSync(join(target, ".git/config"), "utf8");
    const sync = (mode, destination = target) => spawnSync("bash", [script, source, destination, mode], {
      encoding: "utf8", env: { ...process.env, CONFIRM: "1" },
    });

    const preview = sync("--dry-run");
    assert.equal(preview.status, 0, preview.stderr);
    assert.equal(existsSync(join(target, "src/app/page.tsx")), false);
    assert.equal(existsSync(join(target, "src/stale.ts")), true);

    write(target, "src/stale.ts", "local uncommitted edit\n");
    const dirty = sync("--apply");
    assert.notEqual(dirty.status, 0);
    assert.match(dirty.stderr, /local changes/);
    assert.equal(existsSync(join(target, "src/app/page.tsx")), false);
    git(target, "restore", "src/stale.ts");

    const applied = sync("--apply");
    assert.equal(applied.status, 0, applied.stderr);
    assert.equal(readFileSync(join(target, "src/app/page.tsx"), "utf8"), "new application\n");
    assert.equal(existsSync(join(target, "src/stale.ts")), false);
    assert.equal(readFileSync(join(target, ".env"), "utf8"), "production-only\n");
    assert.equal(readFileSync(join(target, "wrangler.toml"), "utf8"), 'name = "production"\n');
    assert.equal(readFileSync(join(target, "node_modules/local.txt"), "utf8"), "preserved dependency\n");
    assert.equal(readFileSync(join(target, ".git/config"), "utf8"), gitConfig);
    assert.ok(existsSync(join(target, ".env.example")));

    assert.notEqual(sync("--apply", source).status, 0, "Must refuse syncing onto itself");
    assert.notEqual(sync("--apply", join(fixture, "missing")).status, 0, "Must refuse missing repo");
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});
