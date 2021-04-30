const fs = require('fs')

describe('test dbml generator', () => {
  it('should produce same json schema for same Prisma schema', () => {
    const dbml = fs.readFileSync('./json-schema/json-schema.json', {
      encoding: 'utf8',
    })
    expect(dbml).toMatchSnapshot()
  })
})
