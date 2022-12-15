#!/bin/sh

(cd linux-alpine-3.17-x64-openssl-3.0.x; ./run.sh) && exit 0;
(cd linux-node-alpine-3.17-x64-openssl-3.0.x; ./run.sh && exit 0;

# assert non-0 final error code
