#!/bin/sh

(cd linux-alpine-3.16-x64-openssl-1.1.x; ./run.sh);
(cd linux-alpine-3.17-x64-openssl-1.1.x; ./run.sh);
(cd linux-node-alpine-3.16-x64-openssl-1.1.x; ./run.sh);
(cd linux-node-alpine-3.17-x64-openssl-1.1.x; ./run.sh);
(cd linux-ubuntu-20.04-x64-openssl-1.1.x; ./run.sh);
(cd linux-ubuntu-22.04-x64-openssl-1.1.x; ./run.sh);

# assert 0 final error code
