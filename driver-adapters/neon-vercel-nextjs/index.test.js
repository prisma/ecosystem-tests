const fetch = require('node-fetch')
const fs = require('fs')

let endpoint
function getDeploymentURL() {
  if (endpoint) return endpoint

  const data = fs.readFileSync('./deployment-url.txt', { encoding: 'utf8' })
  endpoint = data.trim()

  return endpoint
}

const pjson = require('./package.json')

jest.setTimeout(30000)

test('prisma version and output', async () => {
  const response = await fetch(getDeploymentURL() + '/api')
  const data = await response.json()

  expect(data.prismaVersion).toMatch(pjson.dependencies['@prisma/client'])
  expect(data.deleteMany.count).toBe(0)
  expect(data.create).toMatchInlineSnapshot(`
Object {
  "age": 27,
  "email": "test-1@prisma.io",
  "name": "Test 1",
}
`)
  expect(data.createMany.count).toBe(2)
  expect(data.findMany).toMatchInlineSnapshot(`
Array [
  Object {
    "age": 27,
    "email": "test-1@prisma.io",
    "name": "Test 1",
  },
  Object {
    "age": 29,
    "email": "test-2@prisma.io",
    "name": "Test 2",
  },
  Object {
    "age": 29,
    "email": "test-3@prisma.io",
    "name": "Test 3",
  },
]
`)
  expect(data.findUnique).toMatchInlineSnapshot(`
Object {
  "age": 27,
  "email": "test-1@prisma.io",
  "name": "Test 1",
}
`)
  expect(data.update).toMatchInlineSnapshot(`
Object {
  "age": 26,
  "email": "test-1@prisma.io",
  "name": "Test 1",
}
`)
  expect(data.updateMany.count).toBe(1)
  expect(data.findFirst).toMatchInlineSnapshot(`
Object {
  "age": 27,
  "email": "test-1@prisma.io",
  "name": "Test 1",
}
`)
  expect(data.delete).toMatchInlineSnapshot(`
Object {
  "age": 27,
  "email": "test-1@prisma.io",
  "name": "Test 1",
}
`)
  expect(data.count).toBe(2)
  expect(data.aggregate).toMatchInlineSnapshot(`
Object {
  "age": 29,
}
`)
  expect(data.groupBy).toMatchInlineSnapshot(`
Array [
  Object {
    "_count": Object {
      "age": 2,
    },
    "age": 29,
  },
]
`)
  expect(data.findFirstOrThrow).toMatchInlineSnapshot(`
Object {
  "age": 29,
  "email": "test-2@prisma.io",
  "name": "Test 2",
}
`)
  expect(data.findUniqueOrThrow).toMatchInlineSnapshot(`
Object {
  "age": 29,
  "email": "test-2@prisma.io",
  "name": "Test 2",
}
`)
  expect(data.upsert).toMatchInlineSnapshot(`
Object {
  "age": 30,
  "email": "test-4@prisma.io",
  "name": "Test 4",
}
`)
})
