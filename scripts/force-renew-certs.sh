#!/bin/bash

# Manual certificate force renewal script using webroot method

echo "=== Forcing Certificate Renewal (Webroot Method) ==="

# Ensure certbot-www volume exists and is accessible
echo "Checking certbot webroot..."
docker compose exec nginx mkdir -p /var/www/certbot/.well-known/acme-challenge

echo ""
echo "Running force renewal with webroot..."
docker compose run --rm --entrypoint "certbot certonly --webroot -w /var/www/certbot --force-renewal -d oskvid.com -d www.oskvid.com" certbot

RENEWAL_STATUS=$?

if [ $RENEWAL_STATUS -eq 0 ]; then
    echo ""
    echo "Renewal successful! Copying certificates..."
    
    # Remove old files if they exist
    rm -f ./ssl/fullchain.pem ./ssl/privkey.pem
    
    # Copy actual file content (not symlinks) to ./ssl/ (not ./ssl/nginx/)
    docker compose run --rm --entrypoint "cat /etc/letsencrypt/live/oskvid.com/fullchain.pem" certbot > ./ssl/fullchain.pem
    docker compose run --rm --entrypoint "cat /etc/letsencrypt/live/oskvid.com/privkey.pem" certbot > ./ssl/privkey.pem
    
    # Verify files were copied
    if [ -s "./ssl/fullchain.pem" ] && [ -s "./ssl/privkey.pem" ]; then
        echo "Certificates copied successfully"
        ls -la ./ssl/*.pem
    else
        echo "ERROR: Failed to copy certificates"
        exit 1
    fi
    
    echo ""
    echo "Restarting nginx to load new certificates..."
    docker compose restart nginx
    
    echo ""
    echo "Waiting for nginx to restart..."
    sleep 3
else
    echo ""
    echo "Renewal failed with status $RENEWAL_STATUS"
    echo "Check logs with: docker compose logs certbot"
    exit 1
fi

echo ""
echo "=== Checking certificate ==="
sleep 2
echo | openssl s_client -connect localhost:443 -servername oskvid.com 2>/dev/null | openssl x509 -noout -dates

echo ""
echo "Done! Check https://oskvid.com to verify."
