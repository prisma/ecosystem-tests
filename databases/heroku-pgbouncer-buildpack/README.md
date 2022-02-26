# Heroku PgBouncer Buildpack

[Heroku buildpack: pgbouncer](https://github.com/heroku/heroku-buildpack-pgbouncer) allows one to run pgbouncer in a dyno alongside application code. This is different from PgBouncer hosted as a separate infrastructure components (that test is covered in [databases/heroku-pgbouncer](https://github.com/prisma/e2e-tests/tree/dev/databases/heroku-pgbouncer))

## How to run this locally

### Environment variables

The environment variable `DATABASE_URL_PGBOUNCER` should point to a postgres database.
