# OS support: alpine-3.17-amd64-openssl-3.0.x

- Base Docker image: `node:lts-alpine3.17`
- OS: Linux Alpine 3.17
- Arch: amd64 (x86_64)
- OpenSSL location: `/lib/libssl.so.1.1`
- Binary target: `linux-musl`

Although Linux Alpine 3.17+ upgraded to OpenSSL 3, this example uses the `openssl1.1-compat` package to install OpenSSL 1.1.
