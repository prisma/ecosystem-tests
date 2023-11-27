import 'reflect-metadata'
import { resolvers } from './generated/typegraphql-prisma'
import { buildSchema, Field, ObjectType, Query, Resolver } from 'type-graphql'

import { PrismaClient, Prisma } from '@prisma/client'

import { ApolloServer } from 'apollo-server'

interface Context {
  prisma: PrismaClient
}

@ObjectType()
class VersionObject {
  @Field()
  readonly version: string
}

@Resolver()
export class PrismaVersion {
  @Query((returns) => VersionObject, { nullable: false })
  async prismaVersion(): Promise<VersionObject> {
    return { version: Prisma.prismaVersion.client }
  }
}

async function main() {
  const schema = await buildSchema({
    resolvers: [...resolvers, PrismaVersion],
    validate: false,
  })

  const prisma = new PrismaClient()

  const server = new ApolloServer({
    schema,
    context: (): Context => ({ prisma }),
  })
  const { port } = await server.listen(4000)
  console.log(`GraphQL is listening on ${port}!`)
}

main()
