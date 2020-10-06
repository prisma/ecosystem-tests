#!/bin/sh

set -eux

func="$(cat func-tmp.txt)"

firebase functions:log --only "$func"

firebase functions:delete --force "$func"
