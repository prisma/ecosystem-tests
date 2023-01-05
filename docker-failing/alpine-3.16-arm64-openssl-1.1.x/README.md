# OS support: fail-alpine-3.16-arm64-openssl-1.1.x-with-libc

- Base Docker image: `node:lts-alpine3.16`
- OS: Linux Alpine 3.16
- Arch: arm64 (aarch64)
- OpenSSL location: `/lib/libssl.so.1.1`
- Binary target: `linux-arm64-openssl-1.1.x`

Prisma doesn't support the `arm64` architecture for Linux Alpine.
Prisma will download the `linux-arm64-openssl-1.1.x` binary target, which depends on `libc`, which is not supported on Alpine by default.
Running `prisma -v` will fail with:

```sh
Error: Unable to require(`/usr/src/app/node_modules/@prisma/engines/libquery_engine-linux-arm64-openssl-3.0.x.so.node`)
  Error loading shared library ld-linux-aarch64.so.1: No such file or directory (needed by /usr/src/app/node_modules/@prisma/engines/libquery_engine-linux-arm64-openssl-1.1.x.so.node)
```
