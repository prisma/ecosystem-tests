#!/bin/sh

set -eu

if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
  pnpm heroku logs -a e2e-platforms-heroku-binary
else
  pnpm heroku logs -a e2e-platforms-heroku
fi

