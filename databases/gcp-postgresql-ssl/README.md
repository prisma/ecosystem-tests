# GCP PostgresQL with SSL

Google Cloud PostgresQL with SSL

Prisma docs: https://www.prisma.io/docs/concepts/database-connectors/postgresql#configuring-an-ssl-connection
GCP docs: https://cloud.google.com/sql/docs/postgres/configure-ssl-instance

## How to run this locally

### Environment variables

The environment variable `GCP_POSTGRESQL_SSL_DB_URL` should point to a GCP Postgres database. Download the certificates based on GCP docs and put them in the root directory next to this `README.md` file.

The connection string `GCP_POSTGRESQL_SSL_DB_URL` would look like:

`postgresql://<user>:<password>@<host>:<port>/<database>?sslmode=require&sslcert=../server-ca.pem&sslidentity=../client-identity.p12&sslpassword=<client-identity-password>&sslaccept=accept_invalid_certs`

The following files are expected:

- server-ca.pem
- client-cert.pem
- client-key.pem

Please check our internal 1Password E2E vault for a ready-to-use environment variable or  
set up your own database and set the environment variable accordingly.

### Run tests

```shell script
yarn && yarn prisma generate
sh test.sh
```
