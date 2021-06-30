# pnpm package manager

Tests `pnpm` workspaces.

## How to run this locally

### Environment variables

The environment variable `PACKAGERS_PNPM_DEFAULT_OUTPUT_1_PG_URL` and
`PACKAGERS_PNPM_DEFAULT_OUTPUT_2_PG_URL` should point to a postgres database.
In CI, it uses our internal e2e test database that was created with
[prisma/db-provision](https://github.com/prisma/db-provision).

### Run tests

```shell script
sh run.sh
```
