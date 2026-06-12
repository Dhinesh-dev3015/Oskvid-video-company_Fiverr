#!/bin/bash

# Manual certificate renewal and sync
# Run this on the production server to force immediate renewal

echo "Starting manual certificate renewal..."

# Stop nginx to free port 80
docker compose stop nginx

# Force renewal and sync
docker compose run --rm --entrypoint "/bin/sh -c 'chmod +x /opt/certbot-renew.sh && certbot renew --force-renewal && cp /etc/letsencrypt/live/oskvid.com/fullchain.pem /etc/nginx/ssl/fullchain.pem && cp /etc/letsencrypt/live/oskvid.com/privkey.pem /etc/nginx/ssl/privkey.pem'" certbot

echo "Renewal complete. Restarting services..."

# Restart all services
docker compose up -d nginx nextjs-app certbot

# Check certificate
echo "Verifying certificate..."
sleep 2
docker compose exec nginx openssl s_client -connect localhost:443 -servername oskvid.com 2>/dev/null | openssl x509 -noout -dates

echo "Done."
