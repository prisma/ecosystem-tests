import path from 'node:path'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  engine: 'classic',
  datasource: {
    // not used by the client, just to setup the db
    directUrl: env('DATABASE_URL'),
    // fake url to ensure the driver adapter is used
    url: env('INVALID_ENV_VAR'),
  },
  schema: path.join('prisma', 'schema.prisma'),
})
