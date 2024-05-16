export const schema = gql`
  type Query {
    prismaVersion: String! @skipAuth
    files: [String!]! @skipAuth
  }
`
