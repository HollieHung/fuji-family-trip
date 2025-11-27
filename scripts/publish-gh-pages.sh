#!/usr/bin/env bash
set -euo pipefail

# Simple script to publish the dist/ folder to gh-pages branch by cloning into a temporary dir and force pushing
# Usage: GH_TOKEN must be provided in the environment when pushing to a remote that requires authentication.

REPO="${GITHUB_REPOSITORY:-HollieHung/fuji-family-trip}"
TMPDIR=$(mktemp -d)

echo "Publishing dist to gh-pages (temporary dir: $TMPDIR)"

if [ ! -d dist ]; then
  echo "dist/ not found. Build first (npm run build)."
  exit 1
fi

PROJECT_ROOT=$(pwd)
REPO_URL="https://github.com/$REPO.git"
if [ -n "${GH_TOKEN:-}" ]; then
  REPO_URL="https://$GH_TOKEN@github.com/$REPO.git"
fi

git clone --depth 1 --branch gh-pages "$REPO_URL" "$TMPDIR" || git clone "$REPO_URL" "$TMPDIR"
cd "$TMPDIR"
git rm -rf . || true
cp -r "$PROJECT_ROOT/dist/"* .
git add --all

if git diff --staged --quiet; then
  echo "No changes in dist; nothing to push."
  exit 0
fi

git commit -m "chore: publish dist to gh-pages" || true
git push origin gh-pages --force

echo "Published to gh-pages"
