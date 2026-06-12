import sharp from 'sharp'
import ffmpeg from 'fluent-ffmpeg'
import { promises as fs } from 'fs'
import path from 'path'

/**
 * Compress an image file while maintaining original dimensions and aspect ratio
 * @param inputPath - Path to the original image file
 * @param outputPath - Path where the compressed image should be saved
 * @param quality - Compression quality (0-100), default 75
 * @returns Promise that resolves to the compressed file path
 */
export async function compressImage(
  inputPath: string,
  outputPath: string,
  quality: number = 75
): Promise<string> {
  try {
    const inputBuffer = await fs.readFile(inputPath)
    const ext = path.extname(inputPath).toLowerCase()

    let sharpInstance = sharp(inputBuffer)

    // Maintain original dimensions and aspect ratio
    // Apply compression based on file type
    if (ext === '.jpg' || ext === '.jpeg') {
      await sharpInstance
        .jpeg({ quality, mozjpeg: true })
        .toFile(outputPath)
    } else if (ext === '.png') {
      // For PNG, use quality for compression level (0-9, inverted)
      const pngQuality = Math.round((100 - quality) / 11.11) // Convert 0-100 to 0-9
      await sharpInstance
        .png({ compressionLevel: Math.min(9, Math.max(0, pngQuality)), quality })
        .toFile(outputPath)
    } else if (ext === '.webp') {
      await sharpInstance
        .webp({ quality })
        .toFile(outputPath)
    } else if (ext === '.gif') {
      // GIF compression - convert to WebP for better compression
      const webpPath = outputPath.replace(/\.gif$/i, '.webp')
      await sharpInstance
        .webp({ quality })
        .toFile(webpPath)
      return webpPath
    } else {
      // For other formats, try to convert to WebP for better compression
      const webpPath = outputPath.replace(ext, '.webp')
      await sharpInstance
        .webp({ quality })
        .toFile(webpPath)
      return webpPath
    }

    return outputPath
  } catch (error) {
    console.error('Error compressing image:', error)
    throw new Error(`Image compression failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

 /**
  * Compress a video file while maintaining original resolution and aspect ratio.
  * Automatically handles MP4 (H.264/AAC) and WebM (VP9/Opus) formats based on outputPath.
  * @param inputPath - Path to the original video file
  * @param outputPath - Path where the compressed video should be saved
  * @param crf - Constant Rate Factor (lower = higher quality). MP4 default: 23, WebM default: 30.
  * @returns Promise that resolves to the compressed file path
  */
 export async function compressVideo(
   inputPath: string,
   outputPath: string,
   crf?: number 
 ): Promise<string> {
   return new Promise((resolve, reject) => {
     const isWebM = outputPath.toLowerCase().endsWith('.webm');
     
     let command = ffmpeg(inputPath);
 
     if (isWebM) {
       const targetCrf = crf ?? 40; 
 
       command = command
         .videoCodec('libvpx-vp9')
         .outputOptions([
           `-crf ${targetCrf}`,
           '-b:v 0',                // Crucial: VP9 requires video bitrate 0 for true CRF mode
           '-deadline good',        // Balances speed and quality for VP9 encoding
           '-cpu-used 2',           // Speeds up encoding (0-5 scale, 2 or 3 is good for background servers)
           '-pix_fmt yuv420p',       // Web compatibility
           '-an'                    // Audio: disable audio encoding
         ]);
     } else {
       const targetCrf = crf ?? 23;
 
       command = command
         .videoCodec('libx264')
         // .audioCodec('aac')
         .outputOptions([
           `-crf ${targetCrf}`, 
           '-preset medium', 
           '-movflags +faststart', 
           '-pix_fmt yuv420p',
           '-an'
         ]);
     }
 
     command
       .on('start', (commandLine: string) => {
         console.log('FFmpeg command:', commandLine)
       })
       .on('progress', (progress: { percent?: number }) => {
         if (progress.percent) {
           console.log(`Video compression progress: ${Math.round(progress.percent)}%`)
         }
       })
       .on('end', () => {
         console.log('Video compression completed')
         resolve(outputPath)
       })
       .on('error', (err: Error) => {
         console.error('Error compressing video:', err)
         reject(new Error(`Video compression failed: ${err.message}`))
       })
       .save(outputPath)
   })
 }

/**
 * Get file size in bytes
 */
export async function getFileSize(filePath: string): Promise<number> {
  try {
    const stats = await fs.stat(filePath)
    return stats.size
  } catch (error) {
    console.error('Error getting file size:', error)
    return 0
  }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}
