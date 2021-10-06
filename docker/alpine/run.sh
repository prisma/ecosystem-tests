#!/bin/sh

set -eux
export DEBUG="*"
docker build -t prisma_alpine .

docker run -p 3000:3000 -e DATABASE_URL=${DATABASE_URL} prisma_alpine
sleep 3
