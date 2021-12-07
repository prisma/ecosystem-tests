# Netlify CLI

Prisma and Netlify (deploy via netlify CLI) integration.

## How to run this locally

### Netlify authentication

A netlify token needs to be set with the environment variable `NETLIFY_AUTH_TOKEN`.

Alternatively, you can login using `netlify login`.

### Environment variables

The environment variable `NETLIFY_PG_URL` should point to a postgres database.
Please check our internal 1Password E2E vault for a ready-to-use environment variable or  
set up your own database and set the environment variable accordingly.

### Alternative to scripts

Alternatively, you can also try deploying locally, but note that you might that the CI behaviour is not tested which might be relevant:

```shell script
netlify dev
```
