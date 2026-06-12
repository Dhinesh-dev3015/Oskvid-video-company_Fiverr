import { NextRequest, NextResponse } from 'next/server'
import { getStatsData, saveStatsData } from '@/lib/db'

// OPTIONS - Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

// GET - Load stats
export async function GET() {
  try {
    const stats = getStatsData()
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error loading stats:', error)
    return NextResponse.json({ error: 'Failed to load stats' }, { status: 500 })
  }
}

// POST - Update stats
export async function POST(request: NextRequest) {
  try {
    const updates = await request.json()
    
    // Read current stats
    const stats = getStatsData()
    
    // Update stats
    const updatedStats = { ...stats, ...updates }
    
    // Always update lastUpdate when stats are modified
    updatedStats.lastUpdate = new Date().toLocaleDateString()
    
    // Save back to database
    saveStatsData(updatedStats)
    
    return NextResponse.json({ success: true, stats: updatedStats })
  } catch (error) {
    console.error('Error updating stats:', error)
    return NextResponse.json({ error: 'Failed to update stats' }, { status: 500 })
  }
}