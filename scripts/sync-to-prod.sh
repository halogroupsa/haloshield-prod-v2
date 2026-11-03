#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 3 || ( "$3" != --dry-run && "$3" != --apply ) ]]; then
  echo "Usage: bash scripts/sync-to-prod.sh STAGING_DIR PROD_DIR --dry-run|--apply" >&2
  exit 2
fi

for tool in git rsync; do
  command -v "$tool" >/dev/null || { echo "Required tool missing: $tool" >&2; exit 1; }
done

for directory in "$1" "$2"; do
  if [[ ! -d "$directory" ]]; then
    echo "Repo directory does not exist: $directory. Clone it first or set PROD_DIR." >&2
    exit 1
  fi
done

source_dir=$(cd "$1" && pwd -P)
target_dir=$(cd "$2" && pwd -P)
mode=$3

case "$target_dir/" in
  "$source_dir/"*) echo "Production must be a separate checkout outside staging." >&2; exit 1 ;;
esac
case "$source_dir/" in
  "$target_dir/"*) echo "Production must not contain the staging checkout." >&2; exit 1 ;;
esac

for directory in "$source_dir" "$target_dir"; do
  repo_root=$(git -C "$directory" rev-parse --show-toplevel)
  repo_root=$(cd "$repo_root" && pwd -P)
  if [[ "$repo_root" != "$directory" ]]; then
    echo "Directory must be the root of a Git checkout: $directory" >&2
    exit 1
  fi
done

if [[ ! -f "$source_dir/package.json" || ! -d "$source_dir/src/app" ]]; then
  echo "Staging checkout is missing the application source." >&2
  exit 1
fi

# --delete removes obsolete source files; excluded files remain protected in
# the destination. Credentials, Git history, hosting config and local tooling
# are never copied or deleted. Keep the committed environment example.
sync_options=(
  -avi --delete
  --exclude=.git
  --exclude=node_modules
  --exclude=.next
  --exclude=out
  --exclude=.wrangler
  --exclude=.turbo
  --exclude=.cache
  --exclude=build
  --exclude=dist
  --exclude=coverage
  --include=/.env.example
  --exclude='/.env*'
  --exclude='/.dev.vars*'
  --exclude='/wrangler.*'
  --exclude=/.codex
  --exclude=/.claude
  --exclude=/.agents
  --exclude=/.aws
  --exclude=/.openai
  --exclude=/qa
  --exclude=/raw-videos
  --exclude=/generated_images
  --exclude=/research/live-source
  --exclude=/research/original-images
  --exclude=/research/generated-images
  --exclude=/design/hero-concepts
  --exclude=/_source-images
  --exclude=/keywords_planner
  --exclude=/IMAGE_PROMPTS.md
  --exclude=/fitoutspermits-research.md
  --exclude='*.tsbuildinfo'
  --exclude='*.log'
  --exclude=.DS_Store
)

echo "Preview: $source_dir → $target_dir (including obsolete source-file deletions)"
rsync "${sync_options[@]}" --dry-run "$source_dir/" "$target_dir/"
[[ "$mode" == --apply ]] || exit 0

if [[ -n "$(git -C "$target_dir" status --porcelain)" ]]; then
  echo "Production checkout has local changes. Commit or stash them before syncing." >&2
  exit 1
fi

if [[ "${CONFIRM:-0}" != 1 ]]; then
  if [[ ! -t 0 ]]; then
    echo "Re-run interactively, or use make sync-to-prod CONFIRM=1 after reviewing the preview." >&2
    exit 1
  fi
  read -r -p "Apply this sync to the production checkout? [y/N]: " answer
  [[ "$answer" == y || "$answer" == Y ]] || { echo "Cancelled."; exit 0; }
fi

rsync "${sync_options[@]}" "$source_dir/" "$target_dir/"
echo "Production source synced. Review git diff in $target_dir, then commit and push when ready."
