# Prisma Driver Adapters + Vitest

This is a Vitest project that demonstrates how to use Prisma with Driver Adapters.
This project uses:
- Vitest as the test framework
- Cloudflare D1 as a database

Look at the [Cloudflare's Vitest integration documentation](https://developers.cloudflare.com/workers/testing/vitest-integration/) to learn more.

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

Create a local Cloudflare D1 database:

```bash
pnpm wrangler d1 migrations apply d1-vitest --local
```
