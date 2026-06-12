import { promises as fs } from 'fs'
import path from 'path'

export interface CompressionStatus {
  status: 'compressing' | 'complete' | 'failed'
  progress: number
  originalUrl?: string
  originalSize?: number
  compressedUrl?: string
  compressedSize?: number
  compressionRatio?: string
  startedAt?: string
  completedAt?: string
  error?: string
}

const STATUS_DIR = path.join(process.cwd(), '.compression-status')

/**
 * Get the status file path for a job
 */
function getStatusFilePath(jobId: string): string {
  // Sanitize jobId to prevent path traversal
  const sanitizedJobId = jobId.replace(/[^a-zA-Z0-9-_]/g, '')
  return path.join(STATUS_DIR, `${sanitizedJobId}.json`)
}

/**
 * Ensure the status directory exists
 */
async function ensureStatusDir(): Promise<void> {
  try {
    await fs.mkdir(STATUS_DIR, { recursive: true })
  } catch (error) {
    // Directory might already exist
  }
}

/**
 * Write initial compression status
 */
export async function writeCompressionStatus(
  jobId: string,
  status: CompressionStatus
): Promise<void> {
  await ensureStatusDir()
  const filePath = getStatusFilePath(jobId)
  await fs.writeFile(filePath, JSON.stringify(status, null, 2))
}

/**
 * Update existing compression status
 */
export async function updateCompressionStatus(
  jobId: string,
  updates: Partial<CompressionStatus>
): Promise<void> {
  const filePath = getStatusFilePath(jobId)
  
  try {
    const existing = await readCompressionStatus(jobId)
    const updated = { ...existing, ...updates }
    await fs.writeFile(filePath, JSON.stringify(updated, null, 2))
  } catch (error) {
    // If file doesn't exist, create it with the updates
    await writeCompressionStatus(jobId, updates as CompressionStatus)
  }
}

/**
 * Read compression status
 */
export async function readCompressionStatus(
  jobId: string
): Promise<CompressionStatus | null> {
  const filePath = getStatusFilePath(jobId)
  
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content) as CompressionStatus
  } catch (error) {
    return null
  }
}

/**
 * Delete compression status file (cleanup)
 */
export async function deleteCompressionStatus(jobId: string): Promise<void> {
  const filePath = getStatusFilePath(jobId)
  
  try {
    await fs.unlink(filePath)
  } catch (error) {
    // File might not exist
  }
}

/**
 * Clean up old status files (older than 1 hour)
 */
export async function cleanupOldStatusFiles(): Promise<void> {
  await ensureStatusDir()
  
  try {
    const files = await fs.readdir(STATUS_DIR)
    const oneHourAgo = Date.now() - 60 * 60 * 1000
    
    for (const file of files) {
      if (!file.endsWith('.json')) continue
      
      const filePath = path.join(STATUS_DIR, file)
      const stats = await fs.stat(filePath)
      
      if (stats.mtimeMs < oneHourAgo) {
        await fs.unlink(filePath)
        console.log(`Cleaned up old status file: ${file}`)
      }
    }
  } catch (error) {
    console.error('Error cleaning up status files:', error)
  }
}
