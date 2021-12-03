#!/bin/sh

set -eux

os=""
filename="./prisma"

case $OS in
"ubuntu-latest")
  os="linux"
  ;;
"macos-latest")
  os="macos"
  ;;
"windows-latest")
  os="win"
  filename="./prisma.exe"
  ;;
*)
  echo "no such os $OS"
  exit 1
  ;;
esac

yarn pkg node_modules/prisma -t node12-$os

./$filename --version

./$filename

./$filename init --datasource-provider sqlite

#export DEBUG="*"
export DOTENV_CONFIG_DEBUG="true"
export DATABASE_URL="file:./dev.db"
./$filename db push --skip-generate

./$filename generate
