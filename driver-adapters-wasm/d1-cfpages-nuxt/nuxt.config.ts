import nitroCloudflareBindings from 'nitro-cloudflare-dev'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [nitroCloudflareBindings],
  nitro: {
    preset: 'cloudflare-pages',
    experimental: {
      wasm: true,
    },
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },
  devtools: { enabled: true },
})
