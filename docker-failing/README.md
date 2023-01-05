# Docker: OS Support (failing tests)

This folder builds and run Prisma on a series of different unsupported system configurations and architectures, described by `Dockerfile`s.

These systems are named following the convention
  
```
<LINUX_DISTRO>-<VERSION>-<ARCHITECTURE>-openssl-<OPENSSL_VERSION>
```
  
where:
- `LINUX_DISTRO` is the name of the Linux distribution (e.g. `ubuntu`, `debian`, `alpine`)
- `VERSION` is the version of the Linux distribution (e.g. `22.04`, `bullseye`, `latest`)
- `ARCHITECTURE` is the architecture of the Linux distribution (e.g. `amd64`, `arm64`)
- `OPENSSL_VERSION` is the main version of OpenSSL used by the system (e.g. `1.1.x`, `3.0.x`)

All the tests defined in this folder are expected to fail.

## Shared scripts

Please refer to the [README](../docker/README.md) in the `docker` folder.
