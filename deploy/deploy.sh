#!/usr/bin/env bash
# Gera a versão de produção e publica na droplet.
# Uso: ./deploy/deploy.sh
set -euo pipefail

HOST="root@165.227.94.107"
WEB_ROOT="/var/www/ar-orquestraai"

cd "$(dirname "$0")/.."

npm run build

ssh "$HOST" "mkdir -p $WEB_ROOT"
rsync -az --delete dist/ "$HOST:$WEB_ROOT/"
scp -q deploy/Caddyfile "$HOST:/etc/caddy/Caddyfile"
ssh "$HOST" "caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null && systemctl reload caddy"

echo "Publicado em https://165-227-94-107.sslip.io/"
