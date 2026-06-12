import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET(
   request: NextRequest,
   { params }: { params: { path: string[] } },
) {
   try {
      const imagePath = params.path.join('/')
      const filePath = path.join(process.cwd(), 'public', 'images', imagePath)
      console.log(filePath)
      // Security check - ensure file is within public/images
      const resolvedPath = path.resolve(filePath)
      const publicImagesPath = path.resolve(process.cwd(), 'public', 'images')

      if (!resolvedPath.startsWith(publicImagesPath)) {
         return new NextResponse('Forbidden', { status: 403 })
      }
      console.log(resolvedPath)
      const file = await fs.readFile(filePath)
      const ext = path.extname(filePath).toLowerCase()
      const contentType =
         {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp',
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
