import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { createContext } from './context'
import { schema } from './schema'

const app = express()

app.use(
  '/',
  graphqlHTTP((req) => ({
    schema,
    context: createContext(),
    graphiql: true,
  })),
)

app.listen(4000, () => {
  console.log(`🚀 Server ready at: http://localhost:4000`)
})
