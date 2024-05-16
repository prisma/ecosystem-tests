#!/bin/sh

set -eux

yarn prisma -v

os=""
filename="./prisma"
filename2="./amsirp"

case $OS in
"ubuntu-20.04")
  os="linux"
  ;;
"macos-latest")
  os="macos"
  ;;
"windows-latest")
  os="win"
  filename="./prisma.exe"
  filename2="./prisma.exe"
  ;;
*)
  echo "no such os $OS"
  exit 1
  ;;
esac

pnpm exec pkg node_modules/prisma -t node16-$os

# workaround for issue documented in https://github.com/prisma/prisma/pull/10568
mv $filename $filename2

./$filename2 --version

./$filename2

./$filename2 init --datasource-provider sqlite

# add model to schema file
echo -e "\nmodel User {\n  id    Int     @id @default(autoincrement())\n  email String  @unique\n  name  String?\n}\n" >> prisma/schema.prisma

#export DEBUG="*"
set DOTENV_CONFIG_DEBUG=true
export DOTENV_CONFIG_DEBUG="true"

# work around .env not being read successfully
export DATABASE_URL="file:./dev.db"
./$filename2 db push --skip-generate

cat prisma/schema.prisma

./$filename2 generate
