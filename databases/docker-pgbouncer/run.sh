#!/bin/sh

set -eu

yarn install
docker-compose up -d
sleep 30
docker container exec -i $(docker-compose ps -q postgres) psql -U postgres < data.sql
