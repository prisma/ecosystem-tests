#!/bin/sh

set -eux

os=""

case $OS in
"ubuntu-latest")
  os="linux"
  ;;
"macos-latest")
  os="macos"
  ;;
"windows-latest")
  os="win"
  ;;
*)
	echo "no such os $OS"
  exit 1
  ;;
esac

yarn pkg node_modules/@prisma/cli -t node12-$os

./cli --help
