#!/bin/sh

# This script prints the Prisma version information and compares the binaryTarget with the
# expected binaryTarget (read via the environment variable $EXPECTED_PRISMA_TARGET_PLATFORM).
# The script fails with exit code 2 if the binaryTarget does not match the expected binaryTarget.

set -eu

# capture and print Prisma version information
PRISMA_VERSION=$(pnpm prisma -v)
echo "pnpm prisma -v\n${PRISMA_VERSION}\n"

# extract the binaryTarget from the version command output, e.g., "debian-openssl-1.1.x"
PRISMA_TARGET_PLATFORM=$(echo "${PRISMA_VERSION}" | sed --quiet '/Computed binaryTarget/p' | sed "s/.*:\s*//")

if [ $PRISMA_TARGET_PLATFORM = $EXPECTED_PRISMA_TARGET_PLATFORM ]; then
  echo "Current binaryTarget matches expected binaryTarget \"${PRISMA_TARGET_PLATFORM}\""
else
  # Fail if the binaryTarget does not match the expected binaryTarget.
  # This may be the case if e.g. the base Docker image has started shipping a new openssl version.
  echo "Current binaryTarget \"${PRISMA_TARGET_PLATFORM}\" differs from binaryTarget \"${EXPECTED_PRISMA_TARGET_PLATFORM}\""
  (exit 2)
fi
