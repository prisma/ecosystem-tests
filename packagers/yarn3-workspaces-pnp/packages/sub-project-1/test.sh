#!/bin/sh

set -eu

yarn pnpify prisma generate
yarn pnpify prisma -v