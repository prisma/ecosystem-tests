"use strict";
exports.__esModule = true;
exports.schema = void 0;
var schema_1 = require("@nexus/schema");
var schema_2 = require("nexus-plugin-prisma/schema");
var User = schema_1.objectType({
    name: 'User',
    definition: function (t) {
        t.model.id();
        t.model.name();
        t.model.email();
    }
});
var Query = schema_1.objectType({
    name: 'Query',
    definition: function (t) {
        t.crud.user();
        // t.field('user', {
        //   type: 'User',
        //   args: {
        //     email: stringArg(),
        //   },
        //   resolve: (_r, { email }, ctx) => {
        //     return ctx.prisma.user.findUnique({ where: { email } })
        //   },
        // })
    }
});
var Mutation = schema_1.objectType({
    name: 'Mutation',
    definition: function (t) {
        t.crud.createOneUser({ alias: 'signupUser' });
    }
});
exports.schema = schema_1.makeSchema({
    types: [Query, Mutation, User],
    plugins: [schema_2.nexusSchemaPrisma({ experimentalCRUD: true })],
    outputs: {
        schema: __dirname + '/generated/schema.graphql',
        typegen: __dirname + '/generated/nexus.ts'
    },
    typegenAutoConfig: {
        contextType: 'Context.Context',
        sources: [
            {
                source: '@prisma/client',
                alias: 'prisma'
            },
            {
                source: require.resolve('./context'),
                alias: 'Context'
            },
        ]
    }
});
