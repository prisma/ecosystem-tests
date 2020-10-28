#!/bin/sh

set -eux

export DEBUG="*"
yarn install 
# comment this in for testing on the locally hosted postgres service
# docker ps --filter name=auto-recovery* --filter status=running -aq | xargs docker stop $(docker ps -aq)
# docker ps --filter name=auto-recovery* --filter status=running -aq | xargs docker container rm
# docker-compose up -d
# sleep 5
yarn prisma generate
