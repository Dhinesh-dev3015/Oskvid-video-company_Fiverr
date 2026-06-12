import { NextRequest, NextResponse } from 'next/server'
import { readCompressionStatus, deleteCompressionStatus, cleanupOldStatusFiles } from '@/lib/compression-status'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const jobId = searchParams.get('jobId')

  if (!jobId) {
    return NextResponse.json({ error: 'Missing jobId parameter' }, { status: 400 })
  }

  // Clean up old status files occasionally (1% chance per request)
  if (Math.random() < 0.01) {
    cleanupOldStatusFiles().catch(console.error)
  }

  const status = await readCompressionStatus(jobId)

  if (!status) {
    return NextResponse.json({ 
      error: 'Job not found',
      jobId 
    }, { status: 404 })
  }

  return NextResponse.json({
    jobId,
    ...status
  })
}

// Optional: DELETE to clean up status file manually
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const jobId = searchParams.get('jobId')

  if (!jobId) {
    return NextResponse.json({ error: 'Missing jobId parameter' }, { status: 400 })
  }

  await deleteCompressionStatus(jobId)

  return NextResponse.json({ success: true, message: 'Status deleted' })
}
