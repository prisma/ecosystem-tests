#!/usr/bin/env bash

yarn install
yarn bin wrangler
yarn wrangler --version
yarn wrangler publish