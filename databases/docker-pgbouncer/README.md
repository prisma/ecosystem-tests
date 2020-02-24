# PGBouncer with Docker

We want to test Docker and pgBouncer setup with Prisma client. Prisma client constructor has a `forceTransactions` flag to enable support for pgBouncer.

We aim to have two test case, one that doesn't use the `forceTransactions` flag and fails and another which uses the `forceTransactions` flag and succeeds.

## Friction points

Using two clients together, with and without a flag makes both tests flaky. To get around this, commented out the failing test for now.
