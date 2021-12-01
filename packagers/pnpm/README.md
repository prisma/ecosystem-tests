# pnpm package manager

Tests `pnpm`.

## How to run this locally

### Environment variables

The environment variable `DATABASE_URL` should point to a postgres
database. In CI, it uses our internal e2e test database that was created with
[prisma/db-provision](https://github.com/prisma/db-provision).

### Run tests

```shell script
sh run.sh
```
