# PM2

This example runs a simple express server via PM2.

## How to run this locally

1. Setup the environment variable `PROCESS_MANAGER_PM2_PG_URL`
2. `yarn install`
3. `sh run.sh`
4. `sh test.sh`

### Environment variables

The environment variable `PROCESS_MANAGER_PM2_PG_URL` should point to a postgres database.
In CI, it uses our internal e2e test database using `process-managers-pm2` as database URL.
Please check our internal 1Password E2E vault for a ready-to-use environment variable or  
set up your own database and set the environment variable accordingly.
