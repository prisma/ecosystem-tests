# Nexus

A simple Nexus test. Since Nexus is built by Prisma, it may get its own integration tests in the future.

## How to run this locally

### Environment variables

The environment variable `FRAMEWORK_NEXUS_PG_URL` should point to a postgres database.
In CI, it uses our internal e2e test database using `framework-nexus` as database URL.
Please check our internal 1Password for a ready-to-use environment variable or 
set up your own database and set the environment variable accordingly.

### Run tests

```shell script
sh run.sh
```
