#!/bin/sh

set -eux

yarn preview &
pid=$!

sleep 5

expected="{\"createUser\":{\"name\":\"Alice\"},\"updateUser\":{\"name\":\"Bob\"},\"deleteUser\":{\"name\":\"Bob\"},\"enumValue\":\"ADMIN\"}"
actual=$(curl localhost:3000/data.json)

if [ "$expected" != "$actual" ]; then
  echo "expected '$expected', got '$actual'"
  kill $pid
  exit 1
fi

echo "result: $actual"

kill $pid
