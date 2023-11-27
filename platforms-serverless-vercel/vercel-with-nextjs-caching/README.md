# Vercel via CLI with Next.js to test handling of dependency caching

Prisma and Next.js deployed via Vercel CLI. We use this to check that we can
properly handle dependency caching issues and help our users.

## Reminder of the problem scenario

On the first publication to eg. Vercel, the client will auto-generate and it
will get cached. Then we change the schema, and on the second publication, the
client will not auto-generate. Because @prisma/client is cached already, the
auto-generate won't trigger again. We then have a caching problem, and queries
or validation fail because of the de-sync.

https://www.notion.so/prismaio/Research-Vercel-Netlify-caching-behavior-4ca3e950d7bb43e081a1a2f5a5149518

## How to run this locally

Not meant to be ran locally, you will need to adapt the scripts to your own.

### Environment variables

The environment variable `DATABASE_URL` should point to a postgres database.
