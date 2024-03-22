# OS support: debian-latest-amd64-openssl-3.0.x-tls

- Base Docker image: `node:lts-slim`
- OS: Linux Debian (Latest)
- Arch: amd64 (x86_64)
- OpenSSL location: `/usr/lib/x86_64-linux-gnu/libssl.so.1.1`
- Binary target: `debian-openssl-3.0.x`

This test uses a PostgreSQL database via TLS-encrypted connection to check there is no conflict between system OpenSSL 3.0 which we use and OpenSSL 3.0 vendored in Node.js.
