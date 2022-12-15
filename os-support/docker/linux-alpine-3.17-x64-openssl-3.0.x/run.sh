#!/bin/sh

set -eux

# build "prisma-linux-alpine-3.17-x64-openssl-3.0.x" docker image
docker buildx build --load -f Dockerfile --platform=linux/amd64 . -t prisma-linux-alpine-3.17-x64-openssl-3.0.x --progress plain;

docker-compose -f docker-compose.yml up --abort-on-container-exit;
