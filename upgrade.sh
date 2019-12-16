#!/bin/sh

set -eu

if [[ -z $(git status -s) ]]; then
	echo "no changes"
	exit 0
fi

echo "changes, upgrading..."

channel="alpha"
v=$(yarn info prisma2@$channel --json | jq '.data["dist-tags"].alpha' | tr -d '"')

packages=$(find . -not -path "*/node_modules/*" -type f -name "package.json")

echo "$packages" | tr ' ' '\n' | while read -r item; do
	cd "$(dirname "$item")/"
	yarn add "prisma2@$v" --dev
	yarn add "@prisma/photon@$v"
done

git remote add github "https://$GITHUB_ACTOR:$GITHUB_TOKEN@github.com/$GITHUB_REPOSITORY.git"
git pull github "${GITHUB_REF}" --ff-only

git commit -am "chore(packages): bump to $v"

git push github HEAD:"${GITHUB_REF}"

echo "done"
