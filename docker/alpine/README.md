# Docker alpine

This example runs a simple express server via Docker alpine.

## How to run this locally

1. Setup the environment variable `DATABASE_URL`
2. `yarn install`
3. `sh run.sh`
4. `sh test.sh`

### Environment variables

The environment variable `DATABASE_URLj` should point to a postgres database.
In CI, it uses our internal e2e test database using `docker-alpine` as database URL.
Please check our internal 1Password E2E vault for a ready-to-use environment variable or  
set up your own database and set the environment variable accordingly.
