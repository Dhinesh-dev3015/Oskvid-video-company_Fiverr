#!/bin/sh
# Certbot SSL verification harness.
# Runs inside the certbot-test service (certbot/certbot image, Alpine).
# Exits non-zero on any failure. No real certificate is issued or replaced.
#
# Checks:
#   1. Webroot reachability: write a probe to the shared certbot-www volume,
#      fetch it via http://nginx/.well-known/acme-challenge/<probe>.
#   2. ACME dry-run:        certbot renew --dry-run (Let's Encrypt staging).
#   3. Cert expiry:         openssl x509 -checkend (7 days), if cert present.

set -eu

WEBROOT="/var/www/certbot"
CHALLENGE_DIR="${WEBROOT}/.well-known/acme-challenge"
NGINX_HOST="${NGINX_HOST:-nginx}"
CERT_FILE="/etc/letsencrypt/live/oskvid.com/fullchain.pem"
DAYS_THRESHOLD="${DAYS_THRESHOLD:-7}"

fail() { echo "FAIL: $*" >&2; exit 1; }
ok()   { echo "OK: $*"; }

mkdir -p "${CHALLENGE_DIR}"

PROBE_NAME="healthcheck-$(date +%s)-$$"
PROBE_TOKEN="certbot-test-$(date +%s%N 2>/dev/null || date +%s)"
PROBE_PATH="${CHALLENGE_DIR}/${PROBE_NAME}"

cleanup() { rm -f "${PROBE_PATH}" 2>/dev/null || true; }
trap cleanup EXIT INT TERM

echo "=== Check 1/3: webroot reachability via nginx ==="
echo "${PROBE_TOKEN}" > "${PROBE_PATH}"

PROBE_URL="http://${NGINX_HOST}/.well-known/acme-challenge/${PROBE_NAME}"
FETCHED=""
if command -v wget >/dev/null 2>&1; then
    FETCHED=$(wget -q -T 10 -O- "${PROBE_URL}" 2>/dev/null || true)
elif command -v curl >/dev/null 2>&1; then
    FETCHED=$(curl -fsS --max-time 10 "${PROBE_URL}" 2>/dev/null || true)
else
    fail "neither wget nor curl available in container"
fi

if [ "${FETCHED}" != "${PROBE_TOKEN}" ]; then
    fail "webroot probe ${PROBE_URL} returned '${FETCHED}', expected '${PROBE_TOKEN}'"
fi
ok "webroot reachable at ${PROBE_URL}"

echo ""
echo "=== Check 2/3: certbot renew --dry-run (Let's Encrypt staging) ==="
if ! certbot renew --webroot -w "${WEBROOT}" --dry-run --non-interactive --agree-tos; then
    fail "certbot renew --dry-run failed"
fi
ok "dry-run renewal succeeded"

echo ""
echo "=== Check 3/3: cert expiry (>${DAYS_THRESHOLD} days) ==="
if [ ! -f "${CERT_FILE}" ]; then
    echo "SKIP: ${CERT_FILE} not present yet (initial issuance pending)"
else
    SECONDS_THRESHOLD=$(( DAYS_THRESHOLD * 86400 ))
    if openssl x509 -in "${CERT_FILE}" -checkend "${SECONDS_THRESHOLD}" -noout; then
        EXPIRY=$(openssl x509 -in "${CERT_FILE}" -noout -enddate | cut -d= -f2)
        ok "cert valid > ${DAYS_THRESHOLD} days (expires ${EXPIRY})"
    else
        fail "cert expires within ${DAYS_THRESHOLD} days or is already expired"
    fi
fi

echo ""
echo "All checks passed."
