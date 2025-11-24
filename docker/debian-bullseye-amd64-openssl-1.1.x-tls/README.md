# OS support: debian-bullseye-amd64-openssl-1.1.x-tls

- Base Docker image: `node:lts-bullseye-slim`
- OS: Linux Debian Bullseye
- Arch: amd64 (x86_64)
- OpenSSL location: `/usr/lib/x86_64-linux-gnu/libssl.so.1.1`
- Binary target: `debian-openssl-1.1.x`

This test uses a PostgreSQL database via TLS-encrypted connection to check there is no conflict between system OpenSSL 1.1 which we use and OpenSSL 3.0 vendored in Node.js.
