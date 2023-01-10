#!/usr/bin/env bash

set -eu

yarn install

ITX_PDP_MONGODB=$ITX_PDP_MONGODB_DATABASE_URL yarn migrate-deploy
yarn generate-client
