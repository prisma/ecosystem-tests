# Introduction

Prisma and Netlify (current build CI) integration.

# Friction Points

- Since Netlify's current build CI doesn't use the newer version of `zip-it-and-ship-it`, we need to bundle the binaries ourselves. See `build.sh`.
- It might be possible to override the ZISI package via an env var called `ZISI_VERSION`. That is being attempted on [here](../netlify-zisi)
