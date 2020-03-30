import { nexusPrismaPlugin } from 'nexus-prisma'
import { makeSchema, objectType, stringArg } from 'nexus'

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.user()
    // t.field('user', {
    //   type: 'User',
    //   args: {
    //     email: stringArg(),
    //   },
    //   resolve: (_r, { email }, ctx) => {
    //     return ctx.prisma.user.findOne({ where: { email } })
    //   },
    // })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser({ alias: 'signupUser' })
  },
})

export const schema = makeSchema({
  types: [Query, Mutation, User],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})
