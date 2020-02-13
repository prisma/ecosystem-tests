#!/bin/sh

set -eux

npm install -g firebase-tools

func="e2e_firebase_test_$(date "+%s")"

cd functions/ && sh prepare.sh "$func" && cd ..

firebase deploy --token "$FIREBASE_TOKEN" --only "functions:$func"

sh test.sh "$func"
