#!/bin/bash

# Simplified setup script for compression feature
# This script handles everything in one go

echo "=== Setting up Image/Video Compression ==="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if running locally (not in Docker)
if [ ! -f /.dockerenv ] && [ ! -d /app ]; then
    echo -e "${YELLOW}Installing npm packages locally (for IDE support)...${NC}"
    npm install
    echo -e "${GREEN}✓ Local packages installed${NC}"
    echo ""
fi

echo -e "${YELLOW}Building Docker image with FFmpeg...${NC}"
docker compose build nextjs-app

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Docker image built successfully${NC}"
    echo ""
    echo -e "${GREEN}=== Setup Complete! ==="
    echo ""
    echo "Next: Start containers with: docker compose up -d"
    echo "Or test with: ./test-compression.sh"
else
    echo "Error: Docker build failed"
    exit 1
fi
