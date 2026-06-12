import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { compressVideo, getFileSize, formatFileSize } from '@/lib/compression'
import { writeCompressionStatus, updateCompressionStatus } from '@/lib/compression-status'

// Increase timeout for video uploads (for Vercel - 5 minutes max)
export const maxDuration = 300

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const key = formData.get('key') as string
    const page = formData.get('page') as string || 'simple-cms'
    const language = formData.get('language') as string || 'lv'

    if (!file || !key) {
      return NextResponse.json({ error: 'Missing file or key' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['video/mp4', 'video/webm', 'video/mov', 'video/quicktime', 'video/x-msvideo']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Supported: MP4, WebM, MOV, AVI' }, { status: 400 })
    }

    // Validate file size (100MB max)
    if (file.size > 100 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 100MB)' }, { status: 400 })
    }

    // Store videos in /public/videos directory
    const publicDir = path.join(process.cwd(), 'public', 'videos')
    await mkdir(publicDir, { recursive: true })

    const fileExtension = path.extname(file.name) || '.mp4'
    const timestamp = Date.now()
    const fileName = `${key}-${page}-${language}-${timestamp}${fileExtension}`
    const filePath = path.join(publicDir, fileName)
    const jobId = `video-${timestamp}-${key}`

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Save original file first
    await writeFile(filePath, buffer)
    const originalSize = await getFileSize(filePath)

    // Return the public URL path immediately (accessible from /videos/filename)
    const videoUrl = `/videos/${fileName}`

    // Write initial compression status
    await writeCompressionStatus(jobId, {
      status: 'compressing',
      progress: 0,
      originalUrl: videoUrl,
      originalSize,
      startedAt: new Date().toISOString()
    })

    // Start compression in background (non-blocking)
    const compressedFileName = `${key}-${page}-compressed.webm`
    const compressedFilePath = path.join(publicDir, compressedFileName)

    // Use setImmediate to start compression without blocking the response
    setImmediate(async () => {
      try {
        console.log(`Starting background video compression for ${jobId}...`)
        await compressVideo(filePath, compressedFilePath, 32)
        const compressedSize = await getFileSize(compressedFilePath)
        const compressionRatio = ((1 - compressedSize / originalSize) * 100).toFixed(1) + '%'
        
        console.log(`Video compression complete: ${formatFileSize(originalSize)} -> ${formatFileSize(compressedSize)}`)
        
        await updateCompressionStatus(jobId, {
          status: 'complete',
          progress: 100,
          compressedUrl: `/videos/${compressedFileName}`,
          compressedSize,
          compressionRatio,
          completedAt: new Date().toISOString()
        })
      } catch (compressionError) {
        console.error('Background video compression failed:', compressionError)
        await updateCompressionStatus(jobId, {
          status: 'failed',
          error: compressionError instanceof Error ? compressionError.message : 'Compression failed'
        })
      }
    })

    // Return immediately with original URL and job ID for polling
    return NextResponse.json({
      success: true,
      videoUrl,
      fileName,
      originalSize,
      compressionJobId: jobId,
      compressionStatus: 'started',
      message: 'Video uploaded. Compression started in background.'
    })
  } catch (error) {
    console.error('Error uploading video:', error)
    return NextResponse.json({ error: 'Failed to upload video' }, { status: 500 })
  }
}
