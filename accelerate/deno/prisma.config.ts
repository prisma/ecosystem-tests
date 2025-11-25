import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  datasource: {
    url: env('DATAPROXY_COMMON_URL'),
  },
})
