// @ts-check
const { test, expect } = require('@jest/globals')
const { handler } = require('./index')
const { dependencies } = require('./package.json')

jest.setTimeout(15_000)

test('prisma version and output', async () => {
  const { regResult, itxResult } = await handler()

  expect(regResult).toEqual(itxResult)
  expect(regResult.prismaVersion).toMatch(dependencies['@prisma/client'])
  expect(regResult.deleteMany.count).toBe(0)
  expect(regResult.create).toMatchInlineSnapshot(`
{
  "age": 27,
  "email": "test-1@prisma.io",
  "name": "Test 1",
}
`)
  expect(regResult.createMany.count).toBe(2)
  expect(regResult.createManyAndReturn).toMatchInlineSnapshot(`
  [
    {
      "age": 30,
      "email": "test-4@prisma.io",
      "name": "Test 4",
    },
    {
      "age": 30,
      "email": "test-5@prisma.io",
      "name": "Test 5",
    },
  ]
  `)
  expect(regResult.findMany).toMatchInlineSnapshot(`
[
  {
    "age": 27,
    "email": "test-1@prisma.io",
    "name": "Test 1",
  },
  {
    "age": 29,
    "email": "test-2@prisma.io",
    "name": "Test 2",
  },
  {
    "age": 29,
    "email": "test-3@prisma.io",
    "name": "Test 3",
  },
  {
    "age": 30,
    "email": "test-4@prisma.io",
    "name": "Test 4",
  },
  {
    "age": 30,
    "email": "test-5@prisma.io",
    "name": "Test 5",
  },
  {
    "age": 30,
    "email": "test-6@prisma.io",
    "name": "Test 6",
  },
]
`)
  expect(regResult.findUnique).toMatchInlineSnapshot(`
{
  "age": 27,
  "email": "test-1@prisma.io",
  "name": "Test 1",
}
`)
  expect(regResult.update).toMatchInlineSnapshot(`
{
  "age": 26,
  "email": "test-1@prisma.io",
  "name": "Test 1",
}
`)
  expect(regResult.updateMany.count).toBe(1)
  expect(regResult.findFirst).toMatchInlineSnapshot(`
{
  "age": 27,
  "email": "test-1@prisma.io",
  "name": "Test 1",
}
`)
  expect(regResult.delete).toMatchInlineSnapshot(`
{
  "age": 27,
  "email": "test-1@prisma.io",
  "name": "Test 1",
}
`)
  expect(regResult.count).toBe(5)
  expect(regResult.aggregate).toMatchInlineSnapshot(`
{
  "age": 29,
}
`)
  expect(regResult.groupBy).toMatchInlineSnapshot(`
[
  {
    "_count": {
      "age": 2,
    },
    "age": 29,
  },
  {
    "_count": {
      "age": 3,
    },
    "age": 30,
  },
]
`)
  expect(regResult.findFirstOrThrow).toMatchInlineSnapshot(`
{
  "age": 29,
  "email": "test-2@prisma.io",
  "name": "Test 2",
}
`)
  expect(regResult.findUniqueOrThrow).toMatchInlineSnapshot(`
{
  "age": 29,
  "email": "test-2@prisma.io",
  "name": "Test 2",
}
`)
  expect(regResult.upsert).toMatchInlineSnapshot(`
{
  "age": 30,
  "email": "test-upsert@prisma.io",
  "name": "Test upsert",
}
`)
})
