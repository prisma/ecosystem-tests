const fetch = require('node-fetch')

const endpoint = 'https://e2e-vercel-with-nextjs.vercel.app/api'
// const endpoint = 'http://localhost:3001/api'

const pjson = require('./package.json')

test('prisma version and output', async () => {
  const r = await fetch(endpoint)
  const data = await r.json()
  expect(data).toMatchObject({
    prismaVersion: pjson.dependencies['@prisma/client'],
    users: [],
  })
})

// TODO More testing here that the script actually works (see all the other tests)
// TODO Also read files and check for engine file