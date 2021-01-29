"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var express_graphql_1 = require("express-graphql");
var context_1 = require("./context");
var schema_1 = require("./schema");
var app = express_1["default"]();
app.use('/', express_graphql_1.graphqlHTTP(function (req) { return ({
    schema: schema_1.schema,
    context: context_1.createContext(),
    graphiql: true
}); }));
app.listen(4000, function () {
    console.log("\uD83D\uDE80 Server ready at: http://localhost:4000");
});
