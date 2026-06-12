import Database from 'better-sqlite3'
import path from 'path'
import { mkdirSync } from 'fs'

const DATA_DIR = path.join(process.cwd(), 'data')
const DB_PATH = path.join(DATA_DIR, 'cms.db')

// Initialize database
let db: Database.Database | null = null

function getDb(): Database.Database {
  if (db) {
    return db
  }

  // Ensure directory exists synchronously for better-sqlite3
  try {
    mkdirSync(DATA_DIR, { recursive: true })
  } catch {
    // Directory might already exist
  }

  db = new Database(DB_PATH)
  
  // Create table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS cms_data (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      content_data TEXT NOT NULL DEFAULT '{}',
      stats_data TEXT NOT NULL DEFAULT '{}'
    )
  `)

  // Insert default row if it doesn't exist
  const existing = db.prepare('SELECT id FROM cms_data WHERE id = 1').get()
  if (!existing) {
    db.prepare(`
      INSERT INTO cms_data (id, content_data, stats_data)
      VALUES (1, '{}', '{"totalEdits":156,"lastUpdate":"","totalPages":12,"totalImages":48,"totalVideos":6,"activeUsers":1}')
    `).run()
  }

  return db
}

// Get all content data
export function getContentData(): Record<string, any> {
  const database = getDb()
  const row = database.prepare('SELECT content_data FROM cms_data WHERE id = 1').get() as { content_data: string } | undefined
  if (!row) {
    return {}
  }
  try {
    return JSON.parse(row.content_data)
  } catch {
    return {}
  }
}

// Save all content data
export function saveContentData(content: Record<string, any>): void {
  const database = getDb()
  database.prepare('UPDATE cms_data SET content_data = ? WHERE id = 1').run(JSON.stringify(content))
}

// Get stats data
export function getStatsData(): Record<string, any> {
  const database = getDb()
  const row = database.prepare('SELECT stats_data FROM cms_data WHERE id = 1').get() as { stats_data: string } | undefined
  if (!row) {
    return {
      totalEdits: 156,
      lastUpdate: new Date().toLocaleDateString(),
      totalPages: 12,
      totalImages: 48,
      totalVideos: 6,
      activeUsers: 1
    }
  }
  try {
    return JSON.parse(row.stats_data)
  } catch {
    return {
      totalEdits: 156,
      lastUpdate: new Date().toLocaleDateString(),
      totalPages: 12,
      totalImages: 48,
      totalVideos: 6,
      activeUsers: 1
    }
  }
}

// Save stats data
export function saveStatsData(stats: Record<string, any>): void {
  const database = getDb()
  database.prepare('UPDATE cms_data SET stats_data = ? WHERE id = 1').run(JSON.stringify(stats))
}

// Close database connection (useful for cleanup)
export function closeDb(): void {
  if (db) {
    db.close()
    db = null
  }
}

