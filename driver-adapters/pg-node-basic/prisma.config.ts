import path from 'node:path'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  engine: 'classic',
  datasource: {
    url: env('DATABASE_URL'),
  },
  schema: path.join('prisma', 'schema.prisma'),
})
