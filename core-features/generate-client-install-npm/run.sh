#!/bin/sh

set -eux

npm install
npm remove @prisma/client

npx prisma generate
