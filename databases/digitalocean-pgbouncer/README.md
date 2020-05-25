# PgBouncer on DigitalOcean

We want to test DigitalOcean and PgBouncer setup with Prisma Client. Prisma Query Engine has a `pgbouncer=true` query param to enable support for pgBouncer.

We aim to have two test case, one that doesn't use the `pgbouncer=true` query param and fails and another which uses the `pgbouncer=true` query param and succeeds.

## Friction points

Using two clients together, with and without a flag makes both tests flaky. At this point, it is working with both the tests but if it fails, we might want to remove the failing test.

## How to run this locally

### Environment variables

The environment variable `DATABASE_DO_PG_BOUNCER_URL` should point to a postgres database.
Please check our internal 1Password E2E vault for a ready-to-use environment variable or  
set up your own database and set the environment variable accordingly.

### Run tests

```shell script
sh run.sh
```
