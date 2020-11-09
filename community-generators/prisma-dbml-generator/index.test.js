const fs = require('fs')

describe('test dbml generator', () => {
  it('should produce same dbml for same Prisma schema', () => {
    const dbml = fs.readFileSync('./dbml/schema.dbml', {
      encoding: 'utf8',
    })
    expect(dbml).toMatchSnapshot()
  })
})
