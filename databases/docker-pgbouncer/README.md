# PgBouncer with Docker

We want to test Docker and PgBouncer setup with Prisma client. Prisma Query Engine has a `pgbouncer=true` query param to enable support for pgBouncer.

We aim to have two test case, one that doesn't use the `pgbouncer=true` query param and fails and another which uses the `pgbouncer=true` query param and succeeds.

## Friction points

Using two clients together, with and without a flag makes both tests flaky. To get around this, commented out the failing test for now.

## How to run this locally

### Run tests

Runs locally with docker-compose. No environment variables needed.

```shell script
sh run.sh
```
