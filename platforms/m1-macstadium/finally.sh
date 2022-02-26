#!/bin/sh

set -eux

ssh -tt -i ./server-key.pem administrator@207.254.29.83 "rm -rf /Users/administrator/e2e-tests/$GITHUB_JOB/$GITHUB_RUN_ID"

