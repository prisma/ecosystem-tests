#!/bin/sh

# This script prints the system architecture information via `uname -m` and compares it with the
# expected architecture (read via the environment variable $EXPECTED_UNAME_ARCH).
# This is mostly useful for Debian/Ubuntu based images, where `libssl` is stored in a path
# that depends on the architecture following the "uname" format convention
# (e.g. /usr/lib/x86_64-linux-gnu/libssl.so.1.1).  
# The script fails with exit code 2 if the target architecture does not match the expected architecture.

set -eu

# capture and print system architecture
UNAME_ARCH=$(uname -m)
echo "uname -m\n${UNAME_ARCH}\n"

if [ $UNAME_ARCH = $EXPECTED_UNAME_ARCH ]; then
  echo "Current architecture matches expected platform \"${UNAME_ARCH}\""
else
  # Fail if the target architecture does not match the expected architecture.
  echo "Current architecture \"${UNAME_ARCH}\" differs from expected architecture \"${EXPECTED_UNAME_ARCH}\""
  (exit 2)
fi
