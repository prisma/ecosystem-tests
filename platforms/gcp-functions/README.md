# GCP functions

Important note:

GCP fetches the node modules for the user, so we need to define a specific hook to invoke `prisma2 generate`.

```
# package.json
"scripts": {
    "gcp-build": "prisma2 generate",
}
```
