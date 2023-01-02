#!/bin/sh

# This script prints the Prisma version information and compares the target platform with the
# expected platform (read via the environment variable $EXPECTED_PRISMA_TARGET_PLATFORM).
# The script fails with exit code 2 if the target platform does not match the expected platform.

set -eu

# capture and print Prisma version information
PRISMA_VERSION=$(npx prisma -v)
echo "npx prisma -v\n${PRISMA_VERSION}\n"

# extract the target platform from the version string, e.g., "debian-openssl-1.1.x"
PRISMA_TARGET_PLATFORM=$(echo "${PRISMA_VERSION}" | sed --quiet '/Current platform/p' | sed "s/.*:\s*//")

if [ $PRISMA_TARGET_PLATFORM = $EXPECTED_PRISMA_TARGET_PLATFORM ]; then
  echo "Current platform matches expected platform \"${PRISMA_TARGET_PLATFORM}\""
else
  # Fail if the target platform does not match the expected platform.
  # This may be the case if e.g. the base Docker image has started shipping a new openssl version.
  echo "Current platform \"${EXPECTED_PRISMA_TARGET_PLATFORM}\" differs from expected platform \"${EXPECTED_PRISMA_TARGET_PLATFORM}\""
  (exit 2)
fi
