# Supabase Connection Pooling

## How to run this locally

### Environment variables

The environment variable `DATABASE_URL_SUPAPABASE_CONNECTION_POOL` should point to a Supabase Connection Pooling database (using PgBouncer). The environment variable should _not_ have the `&pgbouncer=true` parameter added (as this is done in the test and used to confirm that PgBouncer is running).