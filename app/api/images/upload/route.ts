import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { getFileSize, formatFileSize } from '@/lib/compression'

// Increase timeout for image uploads (60 seconds should be plenty for images)
export const maxDuration = 60

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
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // Validate file size (20MB)
    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 20MB)' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Try to write to filesystem, but fallback to base64 if filesystem is read-only
    let imageUrl: string
    let fileName: string | undefined
    
    try {
      const publicDir = path.join(process.cwd(), 'public', 'images')
      await mkdir(publicDir, { recursive: true })

      // Always convert to WebP for optimal compression
      fileName = `${key}-${page}-${language}.webp`
      const filePath = path.join(publicDir, fileName)

      // Convert to WebP format
      let webpBuffer: Buffer
      let originalSize: number
      
      try {
        webpBuffer = await sharp(buffer)
          .webp({ quality: 80, effort: 6 })
          .toBuffer()
        originalSize = buffer.length
        
        // Save WebP file
        await writeFile(filePath, webpBuffer)
        const compressedSize = webpBuffer.length
        
        console.log(`Image converted to WebP: ${formatFileSize(originalSize)} -> ${formatFileSize(compressedSize)}`)
        
        imageUrl = `/images/${fileName}`
        
        return NextResponse.json({
          success: true,
          imageUrl,
          fileName: fileName || 'base64-image',
          originalSize,
          compressedSize,
          compressionRatio: ((1 - compressedSize / originalSize) * 100).toFixed(1) + '%'
        })
      } catch (conversionError) {
        console.warn('WebP conversion failed, falling back to original:', conversionError)
        // Fallback to original file if conversion fails
        const fileExtension = path.extname(file.name) || '.jpg'
        fileName = `${key}-${page}-${language}-${fileExtension}`
        const fallbackPath = path.join(publicDir, fileName)
        await writeFile(fallbackPath, buffer)
        originalSize = buffer.length
        imageUrl = `/images/${fileName}`
        
        return NextResponse.json({
          success: true,
          imageUrl,
          fileName: fileName || 'base64-image',
          originalSize,
          compressedSize: originalSize,
          compressionRatio: '0%'
        })
      }
    } catch (fsError) {
      // If filesystem write fails (e.g., read-only filesystem on hosting), use base64
      console.warn('Filesystem write failed, falling back to base64:', fsError)
      const base64 = buffer.toString('base64')
      const mimeType = file.type || 'image/jpeg'
      imageUrl = `data:${mimeType};base64,${base64}`
      fileName = undefined // No filename for base64 images
    }

    return NextResponse.json({
      success: true,
      imageUrl,
      fileName: fileName || 'base64-image',
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorDetails = error instanceof Error ? error.stack : String(error)
    console.error('Error details:', errorDetails)
    return NextResponse.json({ 
      error: 'Failed to upload image',
      message: errorMessage,
      details: process.env.NODE_ENV === 'development' ? errorDetails : undefined
    }, { status: 500 })
  }
}
