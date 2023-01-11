# OS support: fail-alpine-3.16-arm64-openssl-1.1.x-with-libc

- Base Docker image: `node:lts-alpine3.16`
- OS: Linux Alpine 3.16
- Arch: arm64 (aarch64)
- OpenSSL location: `/lib/libssl.so.1.1`
- Binary target: `linux-arm64-openssl-1.1.x`

Prisma doesn't support the `arm64` architecture for Linux Alpine (see https://github.com/prisma/prisma/issues/8478).
Prisma will download the `linux-arm64-openssl-1.1.x` binary target, which depends on `libc`, which is not supported on Alpine by default, but that we installed in this image via `apk add libc6-compat`.
Running `prisma -v` will fail with:

```sh
Error: Unable to require(`/usr/src/app/node_modules/@prisma/engines/libquery_engine-linux-arm64-openssl-1.1.x.so.node`)
  Error relocating /usr/src/app/node_modules/@prisma/engines/libquery_engine-linux-arm64-openssl-1.1.x.so.node: __register_atfork: symbol not found
```
