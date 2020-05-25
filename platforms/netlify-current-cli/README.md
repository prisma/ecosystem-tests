# Netlify Current CLI

Prisma and Netlify (current build CI) integration.

## Friction points

- Since Netlify's current build CI doesn't use the newer version of `zip-it-and-ship-it`, we need to bundle the binaries ourselves. See `build.sh`.
- It might be possible to override the ZISI package via an env var called `ZISI_VERSION`.

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
