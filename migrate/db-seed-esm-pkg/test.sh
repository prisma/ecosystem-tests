#!/bin/sh

set -eux

pnpm prisma db pull --print

pnpm prisma db seed

pnpm test
