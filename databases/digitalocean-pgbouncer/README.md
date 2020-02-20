# Introduction

We want to test DigitalOcean and pgBouncer setup with Prisma client. Prisma client constructor has a `forceTransactions` flag to enable support for pgBouncer.

We aim to have two test case, one that doesn't use the `forceTransactions` flag and fails and another which uses the `forceTransactions` flag and succeeds.

# Friction Points

Using two clients together, with and without a flag makes both tests flaky. At this point, it is working with both the tests but if it fails, we might want to remove the failing test.
