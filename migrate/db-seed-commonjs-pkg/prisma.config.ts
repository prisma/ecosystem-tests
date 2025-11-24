import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  datasource: {
    url: env('DATABASE_URL'),
  },
  migrations: {
    seed: 'ts-node prisma/seed.ts',
  },
})
