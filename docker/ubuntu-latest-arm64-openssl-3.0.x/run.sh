#!/bin/sh

set -eux
export DEBUG="*"

yarn install

DOCKER_PLATFORM_ARCH="linux/arm64"
PRISMA_DOCKER_IMAGE_NAME="prisma-ubuntu-latest-amd64-openssl-3.0.x"

docker buildx build --load \
  --platform="${DOCKER_PLATFORM_ARCH}" \
  --build-context app=. \
  --build-context utils=../_utils \
  . -t "${PRISMA_DOCKER_IMAGE_NAME}" \
  --progress plain

docker run -p 3000:3000 \
  "${PRISMA_DOCKER_IMAGE_NAME}" &

sleep 15
