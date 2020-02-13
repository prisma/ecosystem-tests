#!/bin/sh

set -eux

func="$1"

firebase functions:delete --force "$func"
