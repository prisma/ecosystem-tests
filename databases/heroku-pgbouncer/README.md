# Heroku PgBouncer

## How to run this locally

### Environment variables

The environment variable `DATABASE_CONNECTION_POOL_URL` should point to a Heroku postgres database that uses PgBouncer.

Please check our internal 1Password E2E vault for a ready-to-use environment variable or  
set up your own database and set the environment variable accordingly.

### Run tests

```shell script
sh run.sh
```
