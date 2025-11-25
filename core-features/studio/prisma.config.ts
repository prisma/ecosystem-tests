import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  datasource: {
    url: 'file:./prisma/dev.db',
  },
})
