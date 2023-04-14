#!/bin/sh

set -eux

npm install
npm remove @prisma/client

env DEBUG="prisma:generator" npx prisma generate
