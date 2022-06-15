/// <reference types="@types/jest" />

import fetch from 'node-fetch'
const pkgJson = require('./package.json')

test('querying works', async () => {
  const url = process.env.DEPLOYMENT_URL! + '/api/query'
  console.debug(url)
  
  const response = await fetch(url)
  const bodyAsText = await response.text()
  console.debug(bodyAsText)
  
  const data = JSON.parse(bodyAsText)
  expect(data).toMatchInlineSnapshot(`
Object {
  "data": Array [
    Object {
      "email": "Eleanore_Feest@yahoo.com",
      "name": "Autumn",
      "user_id": 1,
    },
    Array [
      Object {
        "email": "Eleanore_Feest@yahoo.com",
        "name": "Autumn",
        "user_id": 1,
      },
      Object {
        "email": "Ezra.Borer@gmail.com",
        "name": "Marguerite",
        "user_id": 2,
      },
      Object {
        "email": "Dustin.Erdman31@gmail.com",
        "name": "Jana",
        "user_id": 3,
      },
      Object {
        "email": "Merle3@gmail.com",
        "name": "Pink",
        "user_id": 4,
      },
      Object {
        "email": "Fredrick.Howe@yahoo.com",
        "name": "Oren",
        "user_id": 5,
      },
      Object {
        "email": "Conrad_Lowe@hotmail.com",
        "name": "Sigmund",
        "user_id": 6,
      },
      Object {
        "email": "Nicola_Hessel10@hotmail.com",
        "name": "Toy",
        "user_id": 7,
      },
      Object {
        "email": "Fredrick_Conroy76@hotmail.com",
        "name": "Brooklyn",
        "user_id": 8,
      },
      Object {
        "email": "Norris40@hotmail.com",
        "name": "Cassandre",
        "user_id": 9,
      },
      Object {
        "email": "Osborne96@gmail.com",
        "name": "Jazmyne",
        "user_id": 10,
      },
    ],
  ],
}
`)
}, 30000)

test('expected files', async () => {
  const url = process.env.DEPLOYMENT_URL! + '/api/files'
  console.debug(url)
  
  const response = await fetch(url)
  const bodyAsText = await response.text()
  console.debug(bodyAsText)
  
  const { data } = JSON.parse(bodyAsText)
  const files = [
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
