import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import nextEnv from "@next/env";

const root = fileURLToPath(new URL("../", import.meta.url));
nextEnv.loadEnvConfig(root, false);
const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://haloshield.ae").origin;
const result = spawnSync("python3", ["scripts/verify-export.py"], {
  cwd: root,
  env: { ...process.env, NEXT_PUBLIC_SITE_URL: origin },
  stdio: "inherit",
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
