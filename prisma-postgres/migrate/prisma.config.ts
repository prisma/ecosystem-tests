import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  engine: 'classic',
  datasource: {
    url: env('DATABASE_URL_PRISMA_POSTGRES'),
  },
})
