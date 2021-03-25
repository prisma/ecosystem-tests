#!/bin/sh

set -eux

rm -rf node_modules
yarn install --production

rm -rf lambda.zip

rm -rf node_modules/prisma
rm -rf node_modules/@prisma/engines
rm -rf node_modules/typescript

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  zip -r lambda.zip index.js prisma/schema.prisma node_modules/.prisma node_modules/**
elif [[ "$OSTYPE" == "win"* ]]; then
  rm -rf temp
  npx copyfiles index.js prisma/schema.prisma temp
  npx cpr node_modules/.prisma temp/node_modules/.prisma
  npx cpr node_modules/@prisma temp/node_modules/@prisma
  npx cpr node_modules/@types temp/node_modules/@types

  powershell.exe -nologo -noprofile -command "& { param([String]$sourceDirectoryName, [String]$destinationArchiveFileName, [Boolean]$includeBaseDirectory); Add-Type -A 'System.IO.Compression.FileSystem'; Add-Type -A 'System.Text.Encoding'; [IO.Compression.ZipFile]::CreateFromDirectory($sourceDirectoryName, $destinationArchiveFileName, [IO.Compression.CompressionLevel]::Fastest, $includeBaseDirectory, [System.Text.Encoding]::UTF8); exit !$?;}" -sourceDirectoryName temp -destinationArchiveFileName lambda.zip -includeBaseDirectory $false
fi

du -b ./lambda.zip
