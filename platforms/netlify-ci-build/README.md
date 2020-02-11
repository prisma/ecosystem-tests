# Introduction

Prisma and Netlify [beta build](https://build-beta.netlify.com/) integration.

# Friction Points

- https://github.com/netlify/build/issues/730
- Not zero-config, binary target configuration needed

  ```
  generator prisma_client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "rhel-openssl-1.0.x"]
  }
  ```

- Sometimes, the Netlify build fails to work with a "missing binary". While I don't know the cause of this yet, clearing the build cache usually fixes it.
