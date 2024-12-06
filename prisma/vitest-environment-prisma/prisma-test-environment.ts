import { prisma } from '@/lib/prisma'
import { execSync } from 'child_process'
import { randomUUID } from 'crypto'
import { Environment } from 'vitest'

function generateDatabaseURL(schema: string) {
  if (process.env.DATABASE_URL) {
    throw new Error('Please provide a database_url environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
      },
    }
  },
}
