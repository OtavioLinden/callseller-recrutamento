#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="$PROJECT_DIR/dist"

BASE_PATH="${DEPLOY_BASE_PATH:-/callseller-recrutamento/}"
TARGET_DIR="${DEPLOY_TARGET_DIR:-/var/www/callseller.funshare.win/htdocs/callseller-recrutamento-prod}"
KEEP_OLD_ASSETS="${DEPLOY_KEEP_OLD_ASSETS:-1}"

echo "[deploy] Projeto: $PROJECT_DIR"
echo "[deploy] Base path: $BASE_PATH"
echo "[deploy] Destino: $TARGET_DIR"

cd "$PROJECT_DIR"
npm run build -- --base="$BASE_PATH"

mkdir -p "$TARGET_DIR"

if command -v rsync >/dev/null 2>&1; then
  if [[ "$KEEP_OLD_ASSETS" == "1" ]]; then
    # Mantem chunks antigos para reduzir quebra em clientes com cache defasado.
    rsync -a "$DIST_DIR/" "$TARGET_DIR/"
  else
    rsync -a --delete "$DIST_DIR/" "$TARGET_DIR/"
  fi
else
  if [[ "$KEEP_OLD_ASSETS" != "1" ]]; then
    rm -rf "$TARGET_DIR"/*
  fi
  cp -a "$DIST_DIR/." "$TARGET_DIR/"
fi

echo "[deploy] Publicacao concluida."
