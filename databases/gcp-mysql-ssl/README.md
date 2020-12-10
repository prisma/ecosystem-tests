# GCP MySQL with SSL

Google Cloud MySQL with SSL

Prisma docs: https://www.prisma.io/docs/concepts/database-connectors/mysql#configuring-an-ssl-connection
GCP docs: https://cloud.google.com/sql/docs/mysql/configure-ssl-instance

## How to run this locally

### Environment variables

The environment variable `GCP_MYSQL_SSL_DB_URL` should point to a GCP MySQL database. It should follow the following pattern:

`mysql://<user>:<password>@<host>:<port>/<database>?sslmode=require&sslcert=../server-ca.pem&sslidentity=../client-identity.p12&sslpassword=<client-identity-password>&sslaccept=accept_invalid_certs`

The 3 mentioned files `server-ca.pem`, `client-cert.pem`, `client-key.pem` are to be downloaded from GCP and put into the root directory next to this `README.md` file. (In the tests of this project, these files are created on demand from environment variables that contain their content)
Please check our internal 1Password E2E vault for a ready-to-use environment variable or  
set up your own database and set the environment variable accordingly.

### Run tests

```shell script
sh run.sh
sh test.sh
```
