#!/bin/sh

set -eux

npm install -g firebase-tools

cd functions/ && sh prepare.sh && cd ..

firebase deploy --token "$FIREBASE_TOKEN" --only functions

sh test.sh
