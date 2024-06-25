// https://developers.cloudflare.com/workers/testing/vitest-integration/get-started/migrate-from-miniflare-2/
declare module 'cloudflare:test' {
  interface ProvidedEnv extends Env {
    TEST_MIGRATIONS: D1Migration[] // Defined in `vitest.config.ts`
  }
}
