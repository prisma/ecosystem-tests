#!/bin/sh

TEST_EXIT_CODE=$1

set -eux

func="$(cat func-tmp.txt)"

firebase functions:log --only "$func"


if [ "$TEST_EXIT_CODE" -eq "0" ]; then
    # If tests passed

    firebase functions:delete --force "$func"

else

    echo "look at logs here"
fi