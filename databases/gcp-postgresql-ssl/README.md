# GCP PostgresQL with SSL

Google Cloud PostgresQL with SSL

Prisma docs: https://www.prisma.io/docs/concepts/database-connectors/postgresql#configuring-an-ssl-connection
GCP docs: https://cloud.google.com/sql/docs/postgres/configure-ssl-instance

## How to run this locally

### Environment variables

The environment variable `GCP_POSTGRESQL_SSL_DB_URL` should point to a GCP PostgresQL database. It should follow the following pattern to include the SSL configuration:

`postgresql://<user>:<password>@<host>:<port>/<database>?sslmode=require&sslcert=../server-ca.pem&sslidentity=../client-identity.p12&sslpassword=<client-identity-password>&sslaccept=accept_invalid_certs`

The referenced files `server-ca.pem` and `client-identity.p12` are created from 3 files (`server-ca.pem`, `client-cert.pem`, `client-key.pem`) that are downloaded from GCP and put into the root directory next to this `README.md` file. (In the tests of this project, these files are created on demand from environment variables that contain their content, then the additional file is created via the `run.sh` script.)
