# Heroku

## How to run this locally

### Heroku authentication

A heroku token needs to be set with the environment variable `HEROKU_API_KEY`. You can find it in our internal 1Password E2E vault.

Alternatively, you can login using `heroku login`.

### Environment variables

The environment variable `HEROKU_PG_URL` should point to a postgres database.

### Heroku + `pnpm`

There is a known issue when using `pnpm` and deploying to Heroku where the current workaround it to use a custom `output` directory for the Prisma Client. See https://github.com/prisma/prisma/issues/24199
