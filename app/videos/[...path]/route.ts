import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET(
   request: NextRequest,
   { params }: { params: { path: string[] } },
) {
   try {
      const imagePath = params.path.join('/')
      const filePath = path.join(process.cwd(), 'public', 'videos', imagePath)
      console.log(filePath)
      // Security check - ensure file is within public/images
      const resolvedPath = path.resolve(filePath)
      const publicImagesPath = path.resolve(process.cwd(), 'public', 'videos')

      if (!resolvedPath.startsWith(publicImagesPath)) {
         return new NextResponse('Forbidden', { status: 403 })
      }
      console.log(resolvedPath)
      const file = await fs.readFile(filePath)
      const ext = path.extname(filePath).toLowerCase()
      const contentType =
         {
            '.mp4': 'video/mp4',
            '.mov': 'video/mp4',
            '.ogg': 'video/ogg',
            '.webm': 'video/webm',
         }[ext] || 'application/octet-stream'
      console.log(contentType)
      return new NextResponse(new Uint8Array(file), {
         headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
         },
      })
   } catch (error) {
      return new NextResponse('Not Found', { status: 404 })
   }
}
