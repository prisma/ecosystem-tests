import path from 'node:path'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  datasource: {
    url: env('DRIVER_ADAPTERS_TIDB_NODE_BASIC_DATABASE_URL'),
  },
  schema: path.join('prisma', 'schema.prisma'),
})
