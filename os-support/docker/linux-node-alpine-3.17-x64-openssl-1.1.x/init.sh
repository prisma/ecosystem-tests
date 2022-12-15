#!/bin/sh

set -eux

echo "Running init.sh"
echo "DATABASE_URL: $DATABASE_URL"

echo ""
echo "ldd libquery_engine.so.node"
echo "$(ldd ./node_modules/.pnpm/@prisma+engines@4.7.1/node_modules/@prisma/engines/libquery_engine-linux-musl.so.node)"
echo ""

echo "openssl version -v: $(openssl version -v)" || "openssl CLI not found"
echo "ls -l /lib/libssl.so*": $(ls -l /lib/libssl.so*) || true
ls /lib/libssl.so.3 || echo "libssl3 not found"
ls /lib/libssl.so.1.1 || echo "libssl1.1 not found"

echo "Retrieving Prisma version..."
echo "prisma -v\n$(pnpm --silent dlx prisma -v)\n"

echo "Waiting 5s for database to be ready..."
sleep 5

echo "Pushing schema to database..."
pnpm --silent dlx prisma db push
echo "  Done."

echo "Seeding database..."
pnpm --silent dlx prisma db seed
echo "  Done."

exit 0;
