#!/bin/sh

set -eux

MACHINE_IP=192.168.1.192

sshpass -p$MACHINE_SECRET ssh -tt github@$MACHINE_IP "echo 'hello world finally' && uname"
# ssh -tt administrator@$MACHINE_IP "rm -rf /Users/administrator/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID/$PRISMA_CLIENT_ENGINE_TYPE"

