export const schema = gql`
  type Query {
    prismaVersion: String!
    files: [String!]!
  }
`
