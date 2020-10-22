#!/bin/sh

set -eu 

yarn install 
docker ps --filter name=auto-recovery* --filter status=running -aq | xargs docker stop
docker ps --filter name=auto-recovery* --filter status=running -aq | xargs docker container rm
docker-compose up -d
sleep 5
yarn prisma generate
