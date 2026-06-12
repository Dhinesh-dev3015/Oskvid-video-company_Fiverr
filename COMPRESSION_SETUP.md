# Image and Video Compression Setup

This document describes the server-side compression implementation for images and videos.

## Overview

The application now compresses uploaded images and videos automatically while preserving the original files. Compression is performed using:
- **Sharp** - For image compression (JPEG, PNG, WebP, GIF)
- **FFmpeg** - For video compression (MP4, MOV, WebM, AVI)

## Compression Settings

- **Images**: Quality 75%, maintains original dimensions and aspect ratio
- **Videos**: CRF 23 (medium quality), H.264 codec, preserves resolution and aspect ratio
- **Originals**: Kept with original filename, compressed versions saved with `-compressed` suffix

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `sharp` - Image processing library
- `fluent-ffmpeg` - Node.js wrapper for FFmpeg
- `@types/fluent-ffmpeg` - TypeScript types

### 2. Build Docker Image

The Dockerfile has been updated to include FFmpeg. Build the image:

```bash
docker-compose build nextjs-app
```

Or use the test script:

```bash
./test-compression.sh
```

### 3. Verify FFmpeg Installation

After starting the container, verify FFmpeg is available:

```bash
docker exec nextjs-app ffmpeg -version
```

## Testing File Upload and Compression

### Test Image Upload

```bash
curl -X POST http://localhost/api/images/upload \
  -F 'file=@/path/to/your/image.jpg' \
  -F 'key=test-key' \
  -F 'page=test-page' \
  -F 'language=en'
```

**Expected Response:**
```json
{
  "success": true,
  "imageUrl": "/images/test-key-test-page-en.jpg",
  "fileName": "test-key-test-page-en.jpg",
  "originalSize": 2048576,
  "compressedUrl": "/images/test-key-test-page-en-compressed.jpg",
  "compressedFileName": "test-key-test-page-en-compressed.jpg",
  "compressedSize": 1024000,
  "compressionRatio": "50.0%"
}
```

### Test Video Upload

```bash
curl -X POST http://localhost/api/videos/upload \
  -F 'file=@/path/to/your/video.mp4' \
  -F 'key=test-key' \
  -F 'page=test-page' \
  -F 'language=en'
```

**Expected Response:**
```json
{
  "success": true,
  "videoUrl": "/videos/test-key-test-page-en-1234567890.mp4",
  "fileName": "test-key-test-page-en-1234567890.mp4",
  "originalSize": 52428800,
  "compressedUrl": "/videos/test-key-test-page-en-1234567890-compressed.mp4",
  "compressedFileName": "test-key-test-page-en-1234567890-compressed.mp4",
  "compressedSize": 31457280,
  "compressionRatio": "40.0%"
}
```

## File Structure

After upload, files are stored as follows:

```
public/
  images/
    {key}-{page}-{language}.{ext}          # Original image
    {key}-{page}-{language}-compressed.{ext}  # Compressed image
  videos/
    {key}-{page}-{language}-{timestamp}.{ext}          # Original video
    {key}-{page}-{language}-{timestamp}-compressed.mp4  # Compressed video (always MP4)
```

## Error Handling

- If compression fails, the original file is still saved and returned
- The API response will not include `compressedUrl` if compression fails
- Compression errors are logged to the console but do not fail the upload

## Compression Details

### Image Compression
- **JPEG**: Uses mozjpeg encoder with quality 75
- **PNG**: Uses compression level based on quality setting
- **WebP**: Uses quality 75
- **GIF**: Converts to WebP format for better compression

### Video Compression
- **Codec**: H.264 (libx264)
- **Audio**: AAC
- **Quality**: CRF 23 (Constant Rate Factor)
- **Preset**: Medium (balance between speed and compression)
- **Output**: Always MP4 format for maximum compatibility
- **Fast Start**: Enabled for web playback

## Troubleshooting

### FFmpeg not found
If you get an error that FFmpeg is not found:
1. Rebuild the Docker image: `docker-compose build nextjs-app`
2. Verify FFmpeg is installed: `docker exec nextjs-app ffmpeg -version`

### Compression fails silently
- Check container logs: `docker logs nextjs-app`
- Verify file permissions on `public/images` and `public/videos` directories
- Ensure sufficient disk space is available

### Sharp installation issues
- Sharp uses native bindings that must match your system
- In Docker, this should work automatically
- If issues persist, try: `npm rebuild sharp`

## Performance Notes

- Image compression is typically very fast (< 1 second for most images)
- Video compression can take longer depending on video length and resolution
- Compression runs asynchronously and does not block the upload response
- Original files are saved first, then compression happens
