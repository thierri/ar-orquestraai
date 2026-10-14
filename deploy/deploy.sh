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
# Mostra a saída do Caddy só se a configuração tiver erro.
ssh "$HOST" 'out=$(caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile 2>&1) || { echo "$out"; exit 1; }; systemctl reload caddy'

echo "Publicado em https://165-227-94-107.sslip.io/"
