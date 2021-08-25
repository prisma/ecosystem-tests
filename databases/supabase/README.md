# Supabase

Supabase Database

## How to run this locally

The environment variable `DATABASE_URL_SUPAPABASE` should point to a Supabasedatabase (not using Connection Pooling).

Please check our internal 1Password E2E vault for a ready-to-use environment variable or  
set up your own database and set the environment variable accordingly.

### Run tests

```shell script
yarn && yarn prisma generate
sh test.sh
```
