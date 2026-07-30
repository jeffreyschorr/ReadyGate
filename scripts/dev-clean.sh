#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "Stopping any existing Next.js dev servers for ReadyGate..."

# Stop processes started from this project.
pkill -f "$ROOT/node_modules/.bin/next dev" 2>/dev/null || true

# Free port 3000 if another local Next.js server is bound to it.
if lsof -ti :3000 >/dev/null 2>&1; then
  echo "Port 3000 is in use. Stopping the process on that port..."
  lsof -ti :3000 | xargs kill 2>/dev/null || true
  sleep 1
fi

echo "Clearing .next cache..."
rm -rf .next

echo ""
echo "Starting dev server on http://localhost:3000"
echo "Tip: do not run 'npm run build' while dev is running — it breaks CSS/JS loading."
echo ""
exec npm run dev
