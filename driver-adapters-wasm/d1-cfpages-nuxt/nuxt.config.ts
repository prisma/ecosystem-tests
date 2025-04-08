import nitroCloudflareBindings from 'nitro-cloudflare-dev'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [nitroCloudflareBindings],
  nitro: {
    preset: 'cloudflare-pages',
    cloudflare: {
      nodeCompat: true,
    },
    experimental: {
      wasm: true,
    },
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    noExternals: false,
    externals: {
      // Need to be inlined explicitly because of `noExternals: false`
      inline: ['vue-bundle-renderer', 'unhead'],
    },
  },
  devtools: { enabled: true },
})
