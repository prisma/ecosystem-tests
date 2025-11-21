import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  datasource: {
    url: env('DATABASE_URL_PRISMA_POSTGRES'),
  },
})
