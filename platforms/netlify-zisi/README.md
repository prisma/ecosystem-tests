# Introduction

Netlify's current build CI uses an older version of zip-it-and-ship-it. This is however, overrideable using an env var called `ZISI_VERSION`.

This build tries to use that env var and deploy Prisma client with minimal configuration with Netlify.

# Friction points

- The Netlify's current build CI did not pick up the correct `ZISI_VERSION`.
- This test is merged (to avoid a long-running branch) but the workflow doesn't run yet
