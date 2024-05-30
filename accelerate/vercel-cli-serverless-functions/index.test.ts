/// <reference types="@types/jest" />

import fetch from 'node-fetch'
const pkgJson = require('./package.json')

test('querying works', async () => {
  const url = process.env.DEPLOYMENT_URL! + '/api/query'
  console.debug(url)

  console.debug(new Date(), 'Start await fetch(url)')
  console.time('fetchTook')

  const response = await fetch(url, {
    headers: {
      'user-agent': 'ecosystem-tests',
    },
  })

  console.timeEnd('fetchTook')
  console.debug(new Date(), 'End await fetch(url)')

  const bodyAsText = await response.text()
  console.debug(bodyAsText)

  const data = JSON.parse(bodyAsText)
  expect(data).toMatchInlineSnapshot(`
{
  "data": [
    {
      "email": "Eleanore_Feest@yahoo.com",
      "name": "Autumn",
      "user_id": 1,
    },
    [
      {
        "email": "Eleanore_Feest@yahoo.com",
        "name": "Autumn",
        "user_id": 1,
      },
      {
        "email": "Ezra.Borer@gmail.com",
        "name": "Marguerite",
        "user_id": 2,
      },
      {
        "email": "Dustin.Erdman31@gmail.com",
        "name": "Jana",
        "user_id": 3,
      },
      {
        "email": "Merle3@gmail.com",
        "name": "Pink",
        "user_id": 4,
      },
      {
        "email": "Fredrick.Howe@yahoo.com",
        "name": "Oren",
        "user_id": 5,
      },
      {
        "email": "Conrad_Lowe@hotmail.com",
        "name": "Sigmund",
        "user_id": 6,
      },
      {
        "email": "Nicola_Hessel10@hotmail.com",
        "name": "Toy",
        "user_id": 7,
      },
      {
        "email": "Fredrick_Conroy76@hotmail.com",
        "name": "Brooklyn",
        "user_id": 8,
      },
      {
        "email": "Norris40@hotmail.com",
        "name": "Cassandre",
        "user_id": 9,
      },
      {
        "email": "Osborne96@gmail.com",
        "name": "Jazmyne",
        "user_id": 10,
      },
    ],
  ],
}
`)
}, 30000)

// TODO
test.skip('expected files', async () => {
  const url = process.env.DEPLOYMENT_URL! + '/api/files'
  console.debug(url)

  const response = await fetch(url, {
    headers: {
      'user-agent': 'ecosystem-tests',
    },
  })
  const bodyAsText = await response.text()
  console.debug(bodyAsText)

  const { data } = JSON.parse(bodyAsText)
  const files = [
    'deno',
    'edge.d.ts',
    'edge.js',
    'index-browser.js',
    'index.d.ts',
    'index.js',
    'libquery_engine-rhel-openssl-1.0.x.so.node',
    'package.json',
    'schema.prisma',
  ]

  expect(data.files).toMatchObject(files)
  expect(data.version).toMatchObject(pkgJson.dependencies['@prisma/client'])
})
