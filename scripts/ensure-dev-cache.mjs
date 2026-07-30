#!/usr/bin/env node
import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const nextDir = join(root, ".next");
const buildIdPath = join(nextDir, "BUILD_ID");

if (existsSync(buildIdPath)) {
  console.warn(
    "\n⚠️  Found production build output in .next while starting dev.",
  );
  console.warn(
    "   This causes 404s for CSS/JS (unstyled pages). Clearing .next...\n",
  );
  rmSync(nextDir, { recursive: true, force: true });
}
