#!/bin/sh

set -eux

yarn install
yarn prisma2 generate
yarn tsc

func azure functionapp publish "prisma-e2e-windows-test-new" --force
