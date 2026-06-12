# Testing Upload and Compression Status Display

This guide explains how to test the improved upload and compression status display for images and videos.

## What Was Updated

### 1. Admin Page (`app/admin/simple-cms/page.tsx`)
- Added new state variables:
  - `uploadStatus` - Tracks current phase: 'uploading' | 'compressing' | 'complete' | 'error'
  - `compressionResults` - Stores compression statistics (original size, compressed size, ratio)
- Updated `handleImageUpload` function to:
  - Track and display distinct phases (uploading vs compressing)
  - Capture and display compression results from server
  - Use compressed URL when available
  - **NEW**: Poll for video compression status (background compression)
- Updated HTML to show:
  - Phase-specific status with icons and animations
  - Progress bar (blue for upload, amber pulse for compression)
  - Compression results card (original size, compressed size, savings percentage)

### 2. Video Upload API (`app/api/videos/upload/route.ts`)
- **Background Compression**: Videos now compress in the background
- Returns immediately after upload with original URL
- Provides `compressionJobId` for polling compression status
- `maxDuration` set to 300 seconds (5 minutes) for Vercel compatibility

### 3. Compression Status System
- **New file**: `lib/compression-status.ts` - Status tracking utilities
- **New API**: `/api/compression-status?jobId=xxx` - Poll for compression status
- Status files stored in `.compression-status/` directory (auto-cleaned after 1 hour)

### 4. New Docker Files for Local Testing
- `Dockerfile.local` - Dockerfile exposing port 3000
- `docker-compose.local.yml` - Simplified compose for local testing

## Testing Steps

### Option 1: Local Testing with Docker (Recommended)

1. **Build and start the container:**
   ```bash
   cd /Users/riciboy/Desktop/2025-projekts
   docker-compose -f docker-compose.local.yml up --build
   ```

2. **Access the admin panel:**
   - Open: http://localhost:3000/admin/login
   - Log in with your credentials

3. **Test image upload:**
   - Navigate to any section with image upload (e.g., Home → Hero section)
   - Select an image file (JPG, PNG, WebP, GIF)
   - Observe the status display:
     - **Uploading...** - Blue spinner with percentage progress
     - **Saspiešana...** (Compressing) - Amber pulsing progress bar
     - **Pabeigts!** (Complete) - Green checkmark
   - View compression results card showing:
     - Original file size
     - Compressed file size
     - Savings percentage

4. **Test video upload:**
   - Navigate to Home → Hero Background
   - Select a video file (MP4, WebM, MOV)
   - Observe the same status phases
   - Video compression takes longer, so the "Saspiešana..." phase will be more visible

5. **Stop the container:**
   ```bash
   docker-compose -f docker-compose.local.yml down
   ```

### Option 2: Development Server

1. **Start the development server:**
   ```bash
   cd /Users/riciboy/Desktop/2025-projekts
   npm run dev
   ```

2. **Access the admin panel:**
   - Open: http://localhost:3000/admin/login

3. **Follow steps 3-4 from Option 1**

## Expected Behavior

### Upload Status Phases

| Phase | Visual | Description |
|-------|--------|-------------|
| Uploading | 🔵 Blue spinner + progress % | File being uploaded to server |
| Compressing | 🟡 Amber pulsing bar | Server compressing the file |
| Complete | ✅ Green checkmark | Upload and compression done |
| Error | ❌ Red X | Something went wrong |

### Compression Results Card

After successful upload, a green card appears showing:
- **Oriģināls** (Original): Original file size in MB
- **Saspiests** (Compressed): Compressed file size in MB  
- **Ietaupīts** (Saved): Percentage reduction

The card auto-dismisses after 10 seconds.

## API Response Format

### Image Upload (`/api/images/upload`)
```json
{
  "success": true,
  "imageUrl": "/images/filename.jpg",
  "originalSize": 2500000,
  "compressedUrl": "/images/filename-compressed.jpg",
  "compressedSize": 750000,
  "compressionRatio": "70.0%"
}
```

### Video Upload (`/api/videos/upload`)
```json
{
  "success": true,
  "videoUrl": "/videos/filename.mp4",
  "originalSize": 50000000,
  "compressedUrl": "/videos/filename-compressed.mp4",
  "compressedSize": 20000000,
  "compressionRatio": "60.0%"
}
```

## Reverting Docker Files

After testing, you can delete the local Docker files:
```bash
rm docker-compose.local.yml Dockerfile.local
```

Or simply ignore them as they don't affect production deployment.

## Troubleshooting

1. **Compression not working:**
   - Ensure ffmpeg is installed (for videos)
   - Check server logs for compression errors
   - Compression may fail silently and use original file

2. **Status not showing:**
   - Clear browser cache
   - Check browser console for JavaScript errors

3. **Docker build fails:**
   - Ensure Docker is running
   - Try `docker system prune` to clear cache
