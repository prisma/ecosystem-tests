#!/bin/sh

set -eux

func="$(cat func-tmp.txt)"

firebase functions:delete --force "$func"
