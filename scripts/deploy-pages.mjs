import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const project = process.env.PAGES_PROJECT?.trim();
if (!project || !/^[a-z0-9][a-z0-9-]*$/.test(project)) {
  console.error("Set the actual Cloudflare project name: make deploy PAGES_PROJECT=your-production-pages-project");
  process.exit(1);
}
const root = fileURLToPath(new URL("../", import.meta.url));
const check = spawnSync("npm", ["run", "check"], { cwd: root, stdio: "inherit" });
if (check.error) throw check.error;
if (check.status !== 0) process.exit(check.status ?? 1);
const deploy = spawnSync(process.execPath, [fileURLToPath(new URL("../node_modules/wrangler/bin/wrangler.js", import.meta.url)), "pages", "deploy", "out", "--project-name", project], { cwd: root, stdio: "inherit" });
if (deploy.error) throw deploy.error;
process.exit(deploy.status ?? 1);
