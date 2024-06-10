# Prisma Driver Adapters Nuxt

This is a Nuxt 3 project that demonstrates how to use Prisma with Driver Adapters.
This project uses:
- Cloudflare Pages as the web platform
- Cloudflare D1 as a database

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

Create a local Cloudflare D1 database:

```bash
pnpm wrangler d1 migrations apply nuxt-db --local
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```

Go to `http://localhost:3000/api` to see an example Prisma query.
