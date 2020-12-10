#!/bin/sh

set -eu

echo "$GCP_POSTGRESQL_SSL_CLIENT_CERT" >> client-cert.pem
echo "$GCP_POSTGRESQL_SSL_CLIENT_KEY" >> client-key.pem
chmod 600 ./client-key.pem
echo "$GCP_POSTGRESQL_SSL_SERVER_CA" >> server-ca.pem

openssl pkcs12 -export -out client-identity.p12 -inkey client-key.pem -in client-cert.pem -password pass:prisma

yarn install
yarn prisma generate
