import 'reflect-metadata'
import { resolvers } from './generated/typegraphql-prisma'
import { buildSchema, Field, ObjectType, Query, Resolver } from 'type-graphql'

import { PrismaClient, Prisma } from '@prisma/client'
import { Context, context } from './context'

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

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

  const server = new ApolloServer<Context>({ schema })
  const { url } = await startStandaloneServer(server, { context: async () => context })
  console.log(`Server is running at ${url}`)
}

main()
