import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "out");
const distDir = join(root, "dist");
const archivePath = join(distDir, "readygate-static.zip");
const stagingDir = join(distDir, "readygate-static");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    ...options,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("Building static export…");
run("npm", ["run", "build"], {
  env: { ...process.env, NEXT_PUBLIC_SHOW_DEMO_PANEL: "true" },
});

if (!existsSync(outDir)) {
  console.error("Build succeeded but out/ was not created.");
  process.exit(1);
}

mkdirSync(distDir, { recursive: true });
rmSync(archivePath, { force: true });
rmSync(stagingDir, { recursive: true, force: true });

cpSync(outDir, stagingDir, { recursive: true });

console.log("Creating archive…");
run("zip", ["-r", archivePath, "."], { cwd: outDir });

console.log("");
console.log(`Static site: ${outDir}`);
console.log(`Upload folder: ${stagingDir}`);
console.log(`Archive: ${archivePath}`);
console.log("");
console.log("Upload the contents of out/ (or extract the zip) into public_html.");
