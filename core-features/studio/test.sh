#!/bin/sh

set -e

export DEBUG="*"

# We're checking for existence of QE binary / library before and after tests.
# We can use this to figure out if Studio is actually using the library when PRISMA_FORCE_NAPI is set, and the binary when it is not

if [[ -z "$PRISMA_FORCE_NAPI" ]] ; then
	# If you are supposed to use binaries, remove all libraries
	rm -rf node_modules/.prisma/client/libquery_engine*
	rm -rf node_modules/@prisma/engines/libquery_engine*
else
	# If you are supposed to use libraries, remove all binaries
	rm -rf node_modules/.prisma/client/query-engine*
	rm -rf node_modules/@prisma/engines/query-engine*
fi

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
else
	# If you are supposed to use libraries, check if binaries were downloaded during tests
	if [[ ! -z "$(ls -1 node_modules/.prisma/client/query-engine* 2>/dev/null)" ]] ; then
		echo '[1] QE binary exists when it should not'
		exit 1
	fi
	if [[ ! -z "$(ls -1 node_modules/@prisma/engines/query-engine* 2>/dev/null)" ]] ; then
		echo '[2] QE binary exists when it should not'
		exit 1
	fi
fi

exit 0