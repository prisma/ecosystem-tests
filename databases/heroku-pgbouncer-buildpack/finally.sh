#!/bin/sh

set -eu

heroku logs -a e2e-buildpack-pgbouncer
