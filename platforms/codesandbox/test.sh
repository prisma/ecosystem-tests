#!/bin/sh

set -eu

SANDBOX_ID=`cat sandbox_id`

CREATE_USER_NAME=`curl --silent https://$SANDBOX_ID.sse.codesandbox.io/ | jq '.createUser.name'`
echo CREATE_USER_NAME
if [ "$CREATE_USER_NAME" = '"Alice"' ]; then
  echo "Create user name is ok"
else
  echo "Create user name is incorrect $CREATE_USER_NAME"
  exit 1
fi

UPDATE_USER_NAME=`curl --silent https://$SANDBOX_ID.sse.codesandbox.io/ | jq '.updateUser.name'`
if [ "$UPDATE_USER_NAME" = '"Bob"' ]; then
  echo "Update user name is ok"
else
  echo "Update user name is incorrect $UPDATE_USER_NAME"
  exit 1
fi

DELETE_COUNT=`curl --silent https://$SANDBOX_ID.sse.codesandbox.io/ | jq '.deleteManyUsers.count'`
if [ $DELETE_COUNT -eq 1 ]; then
  echo "Delete count is ok"
else
  echo "Delete count is incorrect $DELETE_COUNT"
  exit 1
fi