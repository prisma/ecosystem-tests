#!/bin/sh

set -eu

export CI=true

root=$(pwd)

dir=$1
project=$2

echo "running $dir/$project"

cd "$dir/$project"

if [ -f "prepare.sh" ]; then
	echo "prepare script found, executing $dir/$project/prepare.sh"
	sh prepare.sh
fi

set +e
sh run.sh
code=$?
set -e

echo "$dir/$project done"

cd "$root"

(cd .github/slack/ && yarn install --silent)

export webhook="$SLACK_WEBHOOK_URL"
version="$(cat .github/prisma-version.txt)"
sha="$(git rev-parse HEAD | cut -c -7)"

emoji=":x:"
if [ $code -eq 0 ]; then
	emoji=":white_check_mark:"
fi

echo "notifying slack channel"
node .github/slack/notify.js "\`$sha\`: ${emoji} $project ran using prisma@$version"

if [ $code -ne 0 ]; then
	echo "$project failed"

	if [ "$GITHUB_REF" = "refs/heads/master" ]; then
		export webhook="$SLACK_WEBHOOK_URL_FAILING"
		echo "notifying failing slack channel"
		node .github/slack/notify.js "\`$sha\`: :x: $project failed using prisma@$version"
	fi

	echo "exitting with error code $code"
	exit $code
fi
