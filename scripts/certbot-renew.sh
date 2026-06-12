#!/bin/sh

LOG_FILE="/var/log/certbot-renewal.log"
CERT_DIR="/etc/letsencrypt/live/oskvid.com"
WEBROOT="/var/www/certbot"
NGINX_CONTAINER="nginx-ssl"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Check if certificate exists and get expiry date
check_cert_expiry() {
    if [ -f "$CERT_DIR/fullchain.pem" ]; then
        expiry=$(openssl x509 -in "$CERT_DIR/fullchain.pem" -noout -enddate 2>/dev/null | cut -d= -f2)
        if [ -n "$expiry" ]; then
            expiry_epoch=$(date -d "$expiry" +%s 2>/dev/null)
            current_epoch=$(date +%s)
            days_until_expiry=$(( (expiry_epoch - current_epoch) / 86400 ))
            echo "$days_until_expiry"
            return
        fi
    fi
    echo "0"
}

log "Starting certificate renewal check"

DAYS_UNTIL_EXPIRY=$(check_cert_expiry)
log "Certificate expires in $DAYS_UNTIL_EXPIRY days"

# Create webroot directory if it doesn't exist
mkdir -p "$WEBROOT/.well-known/acme-challenge"

if [ "$DAYS_UNTIL_EXPIRY" -lt 30 ]; then
    log "Certificate expires soon or is expired. Running renewal..."
    
    OLD_HASH=""
    if [ -f "$CERT_DIR/fullchain.pem" ]; then
        OLD_HASH=$(md5sum "$CERT_DIR/fullchain.pem" | awk '{print $1}')
    fi
    
    certbot renew --webroot -w "$WEBROOT" --quiet --agree-tos --non-interactive
    
    RENEWAL_STATUS=$?
    
    if [ $RENEWAL_STATUS -eq 0 ]; then
        # Check if certificate actually changed
        NEW_HASH=$(md5sum "$CERT_DIR/fullchain.pem" | awk '{print $1}')
        
        if [ "$OLD_HASH" != "$NEW_HASH" ]; then
            log "Renewal completed successfully - certificate was updated"
            
            log "Reloading nginx to load new certificates..."
            if docker ps | grep -q "$NGINX_CONTAINER"; then
                if docker exec "$NGINX_CONTAINER" nginx -s reload; then
                    log "Nginx reloaded successfully"
                else
                    log "ERROR: nginx reload failed"
                    docker restart "$NGINX_CONTAINER"
                fi
            else
                log "WARNING: Nginx container not running, cannot reload"
            fi
        else
            log "Renewal check completed - no certificate update needed"
        fi
    else
        log "ERROR: Renewal failed with status $RENEWAL_STATUS"
    fi
else
    log "Certificate is still valid (expires in $DAYS_UNTIL_EXPIRY days). No renewal needed."
fi

log "Renewal check finished"
exit 0
