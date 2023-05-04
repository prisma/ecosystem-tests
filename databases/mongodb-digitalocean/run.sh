#!/bin/sh

set -eux

if [ ! -f "ca-certificate.crt" ]; then
    echo "$MONGODB_DIGITALOCEAN_CERT" >> ca-certificate.crt
fi

pnpm install
pnpm prisma generate
