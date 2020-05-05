# Zeit now

Prisma and Zeit's now integration. This works without any configuration.

## How to run this locally

### Zeit authentication

A zeit token needs to be set with the environment variable `ZEIT_TOKEN`.

Alternatively, you can login using `zeit login`.

### Environment variables

The environment variable `ZEIT_NOW_PG_URL` should point to a postgres database.
Please check our internal 1Password E2E vault for a ready-to-use environment variable or  
set up your own database and set the environment variable accordingly.

### Run tests

```shell script
sh run.sh
```
