#!/bin/sh

set -eux

echo "Running init.sh"
echo "DATABASE_URL: $DATABASE_URL"

echo ""
echo "ldd libquery_engine.so.node"
echo "$(ldd ./node_modules/.pnpm/@prisma+engines@4.7.1/node_modules/@prisma/engines/libquery_engine-debian-openssl-1.1.x.so.node)"
echo ""

echo "openssl version -v: $(openssl version -v)" || "openssl CLI not found"
echo "/usr/lib/x86_64-linux-gnu/libssl.so*": $(ls -l /usr/lib/x86_64-linux-gnu/libssl.so*) || true

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
