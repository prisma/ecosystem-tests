# How to access the status of the repo

Since GitHub Actions doesn't have an API yet, you can use the following
POSIX-compliant shell script to access the status of this repository.

```shell script
#!/bin/sh

# This script checks if the prisma ecosystem test workflow passes
# Check the end of the file for usage

check() {
  str=$(curl -s "https://github.com/$1/workflows/$2/badge.svg")

  case "$str" in
    *"passing"*)
      echo "no status, waiting..."
      sleep 10
      check $1 $2
      return
      ;;
  esac

  case "$str" in
    *passing*)
      echo "success"
      exit 0
      ;;
  esac

  echo "fail"
  exit 1
}

# Syntax:
# check <repo slug> <workflow name>
check "prisma/ecosystem-tests" "test"

```
