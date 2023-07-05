# OS support: debian-latest-amd64-openssl-3.0.x

- Base Docker image: `node:lts-slim`
- OS: Linux Debian (latest)
- Arch: amd64 (x86_64)
- OpenSSL location: `/usr/lib/x86_64-linux-gnu/libssl.so.3`
- Binary target: `debian-openssl-3.0.x`

`node:lts-slim` ships with Debian Bookworm, and no longer ships `openssl` by default.
We've installed `openssl-3.0.x` via `apt-get install openssl`.
