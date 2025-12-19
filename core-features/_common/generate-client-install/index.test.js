import { describe, expect, it } from 'vitest'
describe('prisma generate && tsc', () => {
  it('adds @prisma/client to package.json', async () => {
    const pkgjson = require('./package.json')
    expect(pkgjson.dependencies["@prisma/client"]).toBeTruthy()
  })
})
