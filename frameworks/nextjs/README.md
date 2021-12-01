# Next.js

This project uses Prisma Client in a [Next.js](https://nextjs.org/) site with [SSR](https://nextjs.org/docs/basic-features/pages#server-side-rendering) and [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation).

## About this project

### Environment variables

- The environment variable `DATABASE_URL` should point to a PostgreSQL database.

- In CI, it uses our internal E2E test database host using `framework-nextjs` as database.
- Please check our internal 1Password E2E vault for a ready-to-use environment variable value or set up your own database and set the environment variable accordingly.
