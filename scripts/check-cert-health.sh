#!/bin/bash

# Simple certificate health check
# Returns 0 if valid, 1 if expired or expiring soon
# Usage: check-cert-health.sh [path/to/fullchain.pem] [days_threshold]

CERT_FILE="${1:-./ssl/fullchain.pem}"
DAYS_THRESHOLD="${2:-7}"

if [ ! -f "$CERT_FILE" ]; then
    echo "ERROR: Certificate file not found at $CERT_FILE"
    exit 1
fi

# Get expiry date
EXPIRY_DATE=$(openssl x509 -in "$CERT_FILE" -noout -enddate 2>/dev/null | cut -d= -f2)

if [ -z "$EXPIRY_DATE" ]; then
    echo "ERROR: Could not read certificate expiry date"
    exit 1
fi

# Convert to epoch
EXPIRY_EPOCH=$(date -d "$EXPIRY_DATE" +%s 2>/dev/null)
CURRENT_EPOCH=$(date +%s)
DAYS_UNTIL_EXPIRY=$(( (EXPIRY_EPOCH - CURRENT_EPOCH) / 86400 ))

echo "Certificate expires in $DAYS_UNTIL_EXPIRY days (on $EXPIRY_DATE)"

if [ $DAYS_UNTIL_EXPIRY -lt $DAYS_THRESHOLD ]; then
    echo "WARNING: Certificate expires within $DAYS_THRESHOLD days"
    exit 1
fi

echo "OK: Certificate is valid"
exit 0
