#!/bin/sh

set -eu

npx heroku logs -a e2e-platforms-heroku
