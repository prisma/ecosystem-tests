# NestJS

## Friction points

- Some code is duplicated from the initial NestJS template

## How to run this locally

### Environment variables

The environment variable `FRAMEWORK_NESTJS_PG_URL` should point to a postgres database.
In CI, it uses our internal e2e test database using `framework-nestjs` as database URL.
Please check our internal 1Password for a ready-to-use environment variable or 
set up your own database and set the environment variable accordingly.

### Run tests

```shell script
sh run.sh
```
