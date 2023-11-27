#!/bin/sh

set -eu

pnpm heroku logs -a e2e-buildpack-pgbouncer
