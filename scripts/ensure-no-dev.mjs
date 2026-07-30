#!/usr/bin/env node
import { execSync } from "node:child_process";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const devPattern = `${root}/node_modules/.bin/next dev`;

try {
  const output = execSync(`pgrep -fl "${devPattern}"`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();

  if (output) {
    console.error(
      "\n❌ Cannot run `npm run build` while the dev server is running.",
    );
    console.error(
      "   Building overwrites .next and breaks the running dev server.",
    );
    console.error("   Stop dev first (Ctrl+C), or run: npm run dev:clean\n");
    process.exit(1);
  }
} catch {
  // pgrep exits 1 when no processes match — that's expected.
}
