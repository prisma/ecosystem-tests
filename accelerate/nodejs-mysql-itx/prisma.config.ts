import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  datasource: {
    url: env('ITX_PDP_MYSQL'),
  },
})
