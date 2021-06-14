#!/bin/sh

set -e

export DEBUG="*"

# We're checking for existence of QE binary / library before and after tests.
# We can use this to figure out if Studio is actually using the library when PRISMA_FORCE_NAPI is set, and the binary when it is not

# Remove all QE libraries. If a test needs them, it will/should download them
rm -rf node_modules/.prisma/client/libquery_engine*
rm -rf node_modules/@prisma/engines/libquery_engine*

yarn prisma studio -p 5555 -b none &
PRISMA_PID=$!

sleep 3 # Studio takes some time to start up
yarn jest

kill -9 $PRISMA_PID
kill -9 $(lsof -t -i:5555)

if [[ -z "$PRISMA_FORCE_NAPI" ]] ; then
	# If you are supposed to use binaries, check if libraries were downloaded during tests
	if [[ ! -z "$(ls -1 node_modules/.prisma/client/libquery_engine-* 2>/dev/null)" ]] ; then
		echo '[1] QE library exists when it should not'
		exit 1
	fi
	if [[ ! -z "$(ls -1 node_modules/@prisma/engines/libquery_engine-* 2>/dev/null)" ]] ; then
		echo '[2] QE library exists when it should not'
		exit 1
	fi
fi