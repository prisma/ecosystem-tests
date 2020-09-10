const { request, gql } = require('graphql-request')

const query = gql`
  query {
    prismaVersion
    users {
      id
      email
      name
    }
  }
`

test('should query graphql users', async () => {
  const data = await request(
    // 'https://e2e-vercel-with-redwood.vercel.app/api/graphql',
    'http://localhost:8911/graphql',
    query
  )
  expect(data).toMatchSnapshot()
})
