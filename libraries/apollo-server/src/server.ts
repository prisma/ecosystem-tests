import { PrismaClient } from '@prisma/client'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from '@apollo/client/core'
import { createContext } from './context'

const client = new PrismaClient();

const schema = gql`
  type Test {
    result: String
  }

  type Query {
    test: Test
  }
`;

const resolvers = {
  Query: {
    async test() {
      try {
        await client.user.create({
          data: {
            email: 'john@example.com',
            name: 'John Doe',
          },
        })
      } catch (err) { }

      const result = await client.user.findMany({
        where: {
          email: 'john@example.com',
        },
      })

      return {
        result: JSON.stringify(result),
      }
    },
  },
};

async function startServer() {
  const server = new ApolloServer({ typeDefs: schema, resolvers });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => createContext,
    listen: { port: 4000 },
  });

  console.log(
    `🚀 Server ready at: ${url}\n⭐️ See sample queries: http://pris.ly/e/ts/graphql-apollo-server#3-using-the-graphql-api`,
  )
}

startServer()