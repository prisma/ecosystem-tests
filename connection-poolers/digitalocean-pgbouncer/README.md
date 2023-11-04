# PgBouncer on DigitalOcean

Tests PgBouncer on DigitalOcean, connection string has `pgbouncer=true` query param added.

We have two test case, one that doesn't use the `pgbouncer=true` query param and fails and another which uses the `pgbouncer=true` query param and succeeds.

## How to run this locally

### Environment variables

The environment variable `DATABASE_DO_PG_BOUNCER_URL` should point to a DigitalOcean PgBouncer database.