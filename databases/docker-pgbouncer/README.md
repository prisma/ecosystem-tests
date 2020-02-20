# Introduction

This repository exposes two endpoints.

`/` - Prisma client without `forcedTransactions` flag
`/with-flag` - Prisma client with `forcedTransactions` flag

To reproduce:

1. Setup local Postgres and pgBouncer via `docker-compose up -d`
1. Set `DATABASE_URL` in `prisma/.env` to `postgresql://postgres:postgres@127.0.0.1:6433/employees?schema=public'`
1. `prisma2 introspect --url 'postgresql://postgres:postgres@127.0.0.1:5433/employees?schema=public'`
1. Add generator provider to Prisma schema

```
generator client {
  provider = "prisma-client-js"
}
```

1. Run `prisma2 generate`
1. Use `ts-node index.ts` to test.

`/` fails with `ConnectorError(ConnectorError { user_facing_error: None, kind: QueryError(Error { kind: Db, cause: Some(DbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState("26000"), message: "prepared statement \"s0\" does not exist", detail: None, hint: None, position: None, where_: None, schema: None, table: None, column: None, datatype: None, constraint: None, file: Some("prepare.c"), line: Some(505), routine: Some("FetchPreparedStatement") }) }) })`

`/with-flag` works

