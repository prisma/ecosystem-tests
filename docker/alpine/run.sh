#!/bin/sh

set -eux
export DEBUG="*"
docker build -t prisma_alpine .

docker run -p 3000:3000 \ 
-e DEBUG=${DEBUG} \
-e DATABASE_URL=${DATABASE_URL} \
-e CI=${CI} \ 
-e PRISMA_CLIENT_ENGINE_TYPE=${PRISMA_CLIENT_ENGINE_TYPE} \ 
-e PRISMA_TELEMETRY_INFORMATION=${PRISMA_TELEMETRY_INFORMATION}  prisma_alpine

sleep 3
