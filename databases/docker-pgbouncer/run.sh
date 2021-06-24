#!/bin/sh

set -eu

yarn install
yarn prisma generate

# Start database and import data
docker-compose up -d
sleep 30
docker container exec -i $(docker-compose ps -q postgres) psql -U postgres < data.sql
