# Cloudflare Pages + D1 Driver Adapter

Deploys a Prisma Client using D1 Driver Adapter on Cloudflare Pages.

### To create the database schema

```sh
npx prisma migrate diff --from-empty --to-schema-datamodel ./prisma/schema.prisma --script > schema.sql

# For the remote database
wrangler d1 execute d1-cfpages-basic --file=schema.sql

# For the local database
wrangler d1 execute d1-cfpages-basic --file=schema.sql --local
```

Note: if the remote database needs to be created, use `wrangler d1 create d1-cfpages-basic` first and update the TOML.

See https://developers.cloudflare.com/pages/functions/bindings/ about bindings for Pages.
