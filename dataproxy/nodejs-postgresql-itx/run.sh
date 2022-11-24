#!/usr/bin/env bash

set -eu

yarn install

ITX_PDP_POSTGRESQL=$ITX_PDP_POSTGRESQL_DATABASE_URL yarn migrate-deploy
yarn generate-client
