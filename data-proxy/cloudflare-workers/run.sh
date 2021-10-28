#!/usr/bin/env bash

yarn install
yarn prisma generate
yarn wrangler publish