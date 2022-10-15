#!/bin/sh

set -eu

if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
  yarn heroku logs -a e2e-platforms-heroku-binary
else
  yarn heroku logs -a e2e-platforms-heroku
fi

