# OS support: debian-buster-amd64-openssl-1.1.x

- Base Docker image: `node:lts-buster-slim`
- OS: Linux Debian Buster
- Arch: amd64 (x86_64)
- OpenSSL location: `/usr/lib/x86_64-linux-gnu/libssl.so.1.1`
- Binary target: `debian-openssl-1.1.x`

This Docker image doesn't come with any `openssl` version installed, so we installed OpenSSL 1.1.x via the `openssl` package.
