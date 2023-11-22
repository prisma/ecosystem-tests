/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack(config) {
    config.experiments ??= {}

    config.experiments.asyncWebAssembly = true

    return config
  }
}
 
module.exports = nextConfig
