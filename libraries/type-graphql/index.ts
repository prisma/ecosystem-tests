import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import * as path from 'path'
import { buildSchema } from 'type-graphql'

import { TestResolver } from './test-resolver'

async function bootstrap() {
  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [TestResolver],
    // automatically create `schema.gql` file with schema definition in current folder
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  })

  // Create GraphQL server
  const server = new ApolloServer({
    schema,
  })

  // Start the server
  const { url } = await server.listen(4000)
  console.log(`Server is running at ${url}`)
}

bootstrap()
