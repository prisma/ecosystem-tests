import { applyD1Migrations, env } from "cloudflare:test";

async function main() {
  // Setup files run outside isolated storage, and may be run multiple times.
  // `applyD1Migrations()` only applies migrations that haven't already been
  // applied, therefore it is safe to call this function here.
  await applyD1Migrations(env.D1_DATABASE, env.TEST_MIGRATIONS);
}

main()
