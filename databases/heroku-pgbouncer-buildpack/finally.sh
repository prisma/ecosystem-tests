#!/bin/sh

set -eu

yarn heroku logs -a e2e-buildpack-pgbouncer
