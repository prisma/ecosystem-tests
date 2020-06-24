# Heroku PgBouncer

## How to run this locally

### Heroku authentication

A heroku token needs to be set with the environment variable `HEROKU_API_KEY`. You can find it in our internal 1Password E2E vault.

Alternatively, you can login using `heroku login`.

### Environment variables

The environment variable `DATABASE_CONNECTION_POOL_URL` should point to a Heroku postgres database that uses PgBouncer.

Please check our internal 1Password E2E vault for a ready-to-use environment variable or  
set up your own database and set the environment variable accordingly.

### Run tests

```shell script
sh run.sh
```
