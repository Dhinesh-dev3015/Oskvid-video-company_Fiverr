#!/bin/bash

# Deployment script for Oskvid project
# Usage: ./deploy.sh

set -e

SERVER="ubuntu@217.182.171.35"
PASSWORD="oskvid2025!"
REMOTE_DIR="/home/ubuntu/2025-projekts"
PROJECT_DIR="/Users/riciboy/Desktop/2025-projekts"

echo "Starting deployment to $SERVER..."

# Function to run remote commands
run_remote() {
    expect <<EOF
set timeout 300
spawn ssh -o StrictHostKeyChecking=no $SERVER "$1"
expect {
    "password:" {
        send "$PASSWORD\r"
        exp_continue
    }
    "yes/no" {
        send "yes\r"
        exp_continue
    }
    eof
}
EOF
}

# Function to sync files
sync_files() {
    echo "Syncing project files..."
    expect <<EOF
set timeout 600
spawn rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude '.next' \
    --exclude '.git' \
    --exclude 'out' \
    --exclude 'build' \
    --exclude '*.log' \
    --exclude '.vercel' \
    --exclude '*.tsbuildinfo' \
    --exclude 'data/*.db' \
    --exclude 'data/stats.json' \
    -e "ssh -o StrictHostKeyChecking=no" \
    "$PROJECT_DIR/" $SERVER:$REMOTE_DIR/
expect {
    "password:" {
        send "$PASSWORD\r"
        exp_continue
    }
    "yes/no" {
        send "yes\r"
        exp_continue
    }
    eof
}
EOF
}

# Create remote directory
echo "Creating remote directory..."
run_remote "mkdir -p $REMOTE_DIR"

# Sync files
sync_files

# Stop existing containers
echo "Stopping existing containers..."
run_remote "cd $REMOTE_DIR && docker compose down || true"

# Build and start containers
echo "Building and starting Docker containers..."
run_remote "cd $REMOTE_DIR && docker compose up -d --build"

# Wait a bit for containers to start
echo "Waiting for containers to start..."
sleep 10

# Check container status
echo "Checking container status..."
run_remote "cd $REMOTE_DIR && docker compose ps"

# Check certificate health (host-side expiry check against ./ssl/fullchain.pem)
echo "Checking certificate health..."
run_remote "cd $REMOTE_DIR && ./scripts/check-cert-health.sh || echo 'Warning: Certificate health check failed'"

# Verify certbot webroot + ACME challenge end-to-end (dry-run, no real cert change)
echo "Running certbot verification (webroot reachability + LE staging dry-run)..."
run_remote "cd $REMOTE_DIR && docker compose --profile test run --rm certbot-test || echo 'Warning: certbot verification failed'"

echo "Deployment complete!"
echo "Your site should be available at https://oskvid.com"
echo ""
echo "Manual verification entry points:"
echo "  ./scripts/check-cert-health.sh                                 # local cert expiry check"
echo "  docker compose --profile test run --rm certbot-test            # full ACME dry-run verify"

