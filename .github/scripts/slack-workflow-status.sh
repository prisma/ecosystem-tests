#!/bin/bash

set -eu
shopt -s inherit_errexit || true

(cd .github/slack/ && yarn install --silent)

emoji="$1"

export webhook="$SLACK_WEBHOOK_URL_WORKFLOWS"
version="$(cat .github/prisma-version.txt)"
branch="$(git rev-parse --abbrev-ref HEAD)"
sha="$(git rev-parse HEAD)"
short_sha="$(echo "$sha" | cut -c -7)"
message="$(git log -1 --pretty=%B | head -n 1)"

commit_link="\`<https://github.com/prisma/ecosystem-tests/commit/$sha|$branch@$short_sha>\`"
workflow_link="<https://github.com/prisma/ecosystem-tests/actions/runs/$GITHUB_RUN_ID|$message>"

node .github/slack/notify.js "prisma@$version: $emoji $workflow_link (via $commit_link)"
