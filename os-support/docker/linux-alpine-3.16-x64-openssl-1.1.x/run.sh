#!/bin/sh

set -eux

# build "prisma-linux-alpine-3.16-x64-openssl-1.1.x" docker image
docker buildx build --load -f Dockerfile --platform=linux/amd64 . -t prisma-linux-alpine-3.16-x64-openssl-1.1.x --progress plain;

docker-compose -f docker-compose.yml up --abort-on-container-exit;
