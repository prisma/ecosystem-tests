# Netlify ZISI

Netlify's current build CI uses an older version of zip-it-and-ship-it. This is however, overrideable using an env var called `ZISI_VERSION`.

This build tries to use that env var and deploy Prisma client with minimal configuration with Netlify.

## Friction points

- The Netlify's current build CI did not pick up the correct `ZISI_VERSION`.
- This test is merged (to avoid a long-running branch) but the workflow doesn't run yet

## How to run this locally

### Netlify authentication

A netlify token needs to be set with the environment variable `NETLIFY_AUTH_TOKEN`.

Alternatively, you can login using `netlify login`.

### Environment variables

The environment variable `NETLIFY_PG_URL` should point to a postgres database.
Please check our internal 1Password E2E vault for a ready-to-use environment variable or  
set up your own database and set the environment variable accordingly.

### Run tests

```shell script
sh run.sh
```

Alternatively, you can also try deploying locally, but note that you might that the CI behaviour is not tested which might be relevant:

```shell script
netlify dev
```
