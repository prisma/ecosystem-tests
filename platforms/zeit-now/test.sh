#!/bin/sh

set -eu

url="https://e2e-platforms-zeit-now.now.sh/"

curl "$url"

CREATE_USER_NAME=$(curl --silent "$url" | jq '.createUser.name')
if [ "$CREATE_USER_NAME" = '"Alice"' ]; then
  echo "Create user name is ok"
else
  echo "Create user name is incorrect $CREATE_USER_NAME"
  exit 1
fi

UPDATE_USER_NAME=$(curl --silent "$url" | jq '.updateUser.name')
if [ "$UPDATE_USER_NAME" = '"Bob"' ]; then
  echo "Update user name is ok"
else
  echo "Update user name is incorrect $UPDATE_USER_NAME"
  exit 1
fi

DELETE_COUNT=$(curl --silent "$url" | jq '.deleteManyUsers.count')
if [ $DELETE_COUNT -eq 1 ]; then
  echo "Delete count is ok"
else
  echo "Delete count is incorrect $DELETE_COUNT"
  exit 1
fi
