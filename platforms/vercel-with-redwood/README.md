# Vercel with Redwood

Redwood deploed on Vercel.

## How to run this locally

### Vercel authentication

A vercel token needs to be set with the environment variable `VERCEL_TOKEN`.

Alternatively, you can login using `vercel login`.

### Environment variables

The environment variable `REDWOOD_WITH_VERCEL_PG_URL` should point to a postgres database.
Please check our internal 1Password E2E vault for a ready-to-use environment variable or  
set up your own database and set the environment variable accordingly.

### Run tests

```shell script
yarn rw dev # change the link in index.test.js to http://localhost:8911/graphql
sh test.sh
```
