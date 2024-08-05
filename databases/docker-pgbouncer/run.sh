#!/bin/sh

set -eu

pnpm install
pnpm prisma generate

# Start database and import data
docker compose up -d

# Wait for services to be healthy
docker compose up --wait

docker container exec -i $(docker-compose ps -q postgres) psql -U postgres < data.sql
