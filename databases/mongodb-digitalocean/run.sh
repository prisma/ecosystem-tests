#!/bin/sh

set -eu

if [ ! -f "ca-certificate.crt" ]; then
    echo "$MONGODB_DIGITALOCEAN_CERT" >> ca-certificate.crt
fi

yarn install
yarn prisma generate
