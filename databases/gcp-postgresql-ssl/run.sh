#!/bin/sh

set -eu

if [ ! -f "client-cert.pem" ]; then
    echo "$GCP_POSTGRESQL_SSL_CLIENT_CERT" >> client-cert.pem
fi
if [ ! -f "client-key.pem" ]; then
    echo "$GCP_POSTGRESQL_SSL_CLIENT_KEY" >> client-key.pem
fi
chmod 600 ./client-key.pem
if [ ! -f "server-ca.pem" ]; then
    echo "$GCP_POSTGRESQL_SSL_SERVER_CA" >> server-ca.pem
fi

openssl pkcs12 -export -out client-identity.p12 -inkey client-key.pem -in client-cert.pem -password pass:prisma

pnpm install
pnpm prisma generate
