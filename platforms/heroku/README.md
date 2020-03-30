# Heroku

## Friction points

- https://github.com/prisma/prisma2/issues/1540

## How to run this locally

### Heroku authentication

A heroku token needs to be set with the environment variable `HEROKU_API_KEY`. You can find it in our internal 1Password E2E vault.

Alternatively, you can login using `heroku login`.

### Environment variables

The environment variable `HEROKU_PG_URL` should point to a postgres database.
Please check our internal 1Password E2E vault for a ready-to-use environment variable or  
set up your own database and set the environment variable accordingly.

### Run tests

```shell script
sh run.sh
```

