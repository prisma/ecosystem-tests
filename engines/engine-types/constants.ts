export enum EngineType {
  NodeAPI = 'node-api',
  Binary = 'binary',
}

export const ENV_VARS = {
  // Overrides the query engine used in the generated client
  PRISMA_CLIENT_ENGINE_TYPE: 'PRISMA_CLIENT_ENGINE_TYPE',
  // Overrides the query engine used in the CLI
  PRISMA_CLI_QUERY_ENGINE_TYPE: 'PRISMA_CLI_QUERY_ENGINE_TYPE',
  // For Overriding Query Engine Library Path
  PRISMA_QUERY_ENGINE_LIBRARY: 'PRISMA_QUERY_ENGINE_LIBRARY',
  // For Overriding Query Engine Binary Path
  PRISMA_QUERY_ENGINE_BINARY: 'PRISMA_QUERY_ENGINE_BINARY',
}
export const DEFAULT_CLI_QUERY_ENGINE_TYPE = EngineType.NodeAPI
export const DEFAULT_CLIENT_ENGINE_TYPE = EngineType.NodeAPI

