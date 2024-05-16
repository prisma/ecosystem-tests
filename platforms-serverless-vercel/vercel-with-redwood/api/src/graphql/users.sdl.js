export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String
  }

  type Query {
    users: [User!]! @skipAuth
    user(id: String!): User @skipAuth
  }
`
