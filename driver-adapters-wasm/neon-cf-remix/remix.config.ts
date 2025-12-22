/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/*.css'],
  server: './server.ts',
  serverConditions: ['workerd', 'worker', 'browser'],
  serverDependenciesToBundle: [/^(?!.*\b__STATIC_CONTENT_MANIFEST\b|@prisma\/client).*$/],
  serverMainFields: ['browser', 'module', 'main'],
  serverMinify: true,
  serverModuleFormat: 'esm',
  serverPlatform: 'neutral',
}
