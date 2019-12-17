#!/bin/sh

set -eu

echo "checking info..."

channel="alpha"
v=$(yarn info prisma2@$channel --json | jq '.data["dist-tags"].alpha' | tr -d '"')

packages=$(find . -not -path "*/node_modules/*" -type f -name "package.json")

dir=$(pwd)

echo "$packages" | tr ' ' '\n' | while read -r item; do
	echo "checking $item"
	cd "$(dirname "$item")/"
	yarn add "prisma2@$v" --dev
	yarn add "@prisma/photon@$v"
	cd "$dir"
done

if [ -z "$(git status -s)" ]; then
	echo "no changes"
	exit 0
fi

echo "changes, upgrading..."

mkdir -p ~/.ssh
echo "$SSH_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
ssh-keyscan github.com >> ~/.ssh/known_hosts

git config --global user.email "prismabots@gmail.com"
git config --global user.name "Prismo"

git remote add github "git@github.com:$GITHUB_REPOSITORY.git"
git pull github "${GITHUB_REF}" --ff-only

git commit -am "chore(packages): bump prisma2 to $v"

git push github HEAD:"${GITHUB_REF}"

echo "done"
