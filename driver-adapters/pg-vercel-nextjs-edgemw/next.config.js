const path = require('path')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack(config, { webpack }) {
    config.experiments ??= {}
    config.plugins ??= []

    console.log()

    config.experiments.asyncWebAssembly = true
    config.plugins.push(new webpack.IgnorePlugin({
      resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
    }))
    config.resolve ??= {}
    config.resolve.alias ??= {}
    config.resolve.fallback ??= {}
    config.resolve.fallback.crypto = false
    config.resolve.fallback.stream = false
    config.resolve.fallback.net = false
    config.resolve.alias['pg-cloudflare'] = path.join(path.dirname(require.resolve('pg-cloudflare')), 'index.js')

    return config
  }
}

module.exports = nextConfig
