import { resolvers } from './generated/typegraphql-prisma'
import { buildSchema } from 'type-graphql'

import { PrismaClient } from '@prisma/client'

import { ApolloServer } from 'apollo-server'

interface Context {
  prisma: PrismaClient
}

async function main() {
  const schema = await buildSchema({
    resolvers,
    validate: false,
  })

  const prisma = new PrismaClient()

  const server = new ApolloServer({
    schema,
    playground: true,
    context: (): Context => ({ prisma }),
  })
  const { port } = await server.listen(4000)
  console.log(`GraphQL is listening on ${port}!`)
}

main()
