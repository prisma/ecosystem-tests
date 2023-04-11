#!/bin/sh

TEST_EXIT_CODE=$1

set -eux

func="$(cat func-tmp.txt)"

pnpm exec firebase functions:log --only "$func"

echo "full logs: https://console.firebase.google.com/project/prisma-e2e-tests-265911/functions/logs?functionFilter=$func(us-central1)&search=&severity=DEBUG"
echo "project name: prisma-e2e-tests-265 911"

if [ "$TEST_EXIT_CODE" -eq "0" ]; then
    # If tests passed

    pnpm exec firebase functions:delete --force "$func"

fi