#!/bin/sh

set -eux

echo "Running init.sh"
echo "DATABASE_URL: $DATABASE_URL"

echo "/etc/ld.so.conf: $(cat /etc/ld.so.conf)"
exit 0

echo ""
echo "ldd libquery_engine.so.node"
echo "$(ldd ./node_modules/.pnpm/@prisma+engines@4.7.1/node_modules/@prisma/engines/libquery_engine-linux-musl.so.node)"
echo ""

echo "openssl version -v: $(openssl version -v)" || true
echo "ls -l /lib64 | grep ssl: $(ls -l /lib64 | grep ssl)" || true
echo "ls -l /usr/lib64 | grep ssl: $(ls -l /usr/lib64 | grep ssl)" || true
echo "ls -l /lib/libssl.so*" || true

echo ""
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
