import path from 'node:path'
import { defineWorkersConfig, readD1Migrations } from '@cloudflare/vitest-pool-workers/config'

// Read all migrations in the `migrations` directory
const migrationsPath = path.join(__dirname, "migrations");
const migrations = await readD1Migrations(migrationsPath);

export default defineWorkersConfig({
  test: {
    setupFiles: ['./src/apply-migrations.ts'],
    globals: true,
    include: ['**.test.ts'],
    poolOptions: {
      workers: {
        isolatedStorage: true,
        wrangler: {
          configPath: './wrangler.toml',
        },
        miniflare: {
          // Add a test-only binding for migrations, so we can apply them in a
          // setup file
          bindings: { TEST_MIGRATIONS: migrations },
        },
      },
    },
    // The lines below are equivalent to Jest's --runInBand
    // "Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests."
    fileParallelism: false,
    sequence: {
      concurrent: false,
    },
  },
})
