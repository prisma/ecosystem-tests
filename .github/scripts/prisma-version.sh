#!/bin/bash

set -eu
shopt -s inherit_errexit || true

channel="$1"

npm show prisma@$channel version

