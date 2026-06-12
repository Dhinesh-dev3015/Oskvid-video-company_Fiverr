#!/bin/bash

# Test script for image and video compression
# This script helps verify that compression is working correctly

echo "=== Testing Image and Video Compression Setup ==="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 1: Building Docker image...${NC}"
docker compose build nextjs-app

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Docker build failed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker image built successfully${NC}"
echo ""

echo -e "${YELLOW}Step 2: Starting containers...${NC}"
docker compose up -d

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to start containers${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Containers started${NC}"
echo ""

# Wait for container to be ready
echo -e "${YELLOW}Step 3: Waiting for container to be ready...${NC}"
sleep 5

echo -e "${YELLOW}Step 4: Testing ffmpeg installation in container...${NC}"
docker exec nextjs-app ffmpeg -version

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ FFmpeg is installed and working${NC}"
else
    echo -e "${RED}✗ FFmpeg is not available${NC}"
    exit 1
fi
echo ""

echo -e "${YELLOW}Step 5: Testing Node.js packages...${NC}"
docker exec nextjs-app node -e "require('sharp'); require('fluent-ffmpeg'); console.log('✓ All compression packages are available')"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Compression packages are installed${NC}"
else
    echo -e "${RED}✗ Compression packages are missing${NC}"
    exit 1
fi
echo ""

echo -e "${GREEN}=== All basic tests passed! ===${NC}"
echo ""
echo "Next steps:"
echo "1. Upload an image via POST to /api/images/upload"
echo "2. Upload a video via POST to /api/videos/upload"
echo "3. Check the response for 'compressedUrl' and 'compressionRatio' fields"
echo "4. Verify both original and compressed files exist in public/images and public/videos"
echo ""
echo "Example curl command for image upload:"
echo "curl -X POST http://localhost/api/images/upload \\"
echo "  -F 'file=@/path/to/image.jpg' \\"
echo "  -F 'key=test-key' \\"
echo "  -F 'page=test-page' \\"
echo "  -F 'language=en'"
echo ""
echo "Example curl command for video upload:"
echo "curl -X POST http://localhost/api/videos/upload \\"
echo "  -F 'file=@/path/to/video.mp4' \\"
echo "  -F 'key=test-key' \\"
echo "  -F 'page=test-page' \\"
echo "  -F 'language=en'"
