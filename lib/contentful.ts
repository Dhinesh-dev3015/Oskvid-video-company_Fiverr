import { createClient } from "contentful"

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

export async function getEntries(contentType: string) {
  try {
    const entries = await client.getEntries({
      content_type: contentType,
    })
    return entries.items
  } catch (error) {
    console.error("Error fetching entries:", error)
    return []
  }
}

export async function getEntry(entryId: string) {
  try {
    const entry = await client.getEntry(entryId)
    return entry
  } catch (error) {
    console.error("Error fetching entry:", error)
    return null
  }
}
