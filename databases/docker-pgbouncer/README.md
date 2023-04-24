# PgBouncer with Docker

Tests PgBouncer via Docker, connection string has `pgbouncer=true` query param added.

We have two test case, one that doesn't use the `pgbouncer=true` query param and fails and another which uses the `pgbouncer=true` query param and succeeds.

## Friction points

TODO Using two clients together, with and without a flag makes both tests flaky. To get around this, commented out the failing test for now.
