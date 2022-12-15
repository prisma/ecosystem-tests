# OS support: linux-ubuntu-20.04-x64-openssl-1.1.x

- Base Docker image: `ubuntu:20.04`
- OS: Linux Ubuntu 20.04
- Arch: x64
- OpenSSL location: `/usr/lib/x86_64-linux-gnu/libssl.so.1.1`
- Query Engine name: `libquery_engine-debian-openssl-1.1.x.so.node`

## Build & Run

```bash
./run.sh
```

## Expected errors

- No expected error, `./run.sh` should terminate with error code `0`.
