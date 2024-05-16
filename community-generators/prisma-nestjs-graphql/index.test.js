const fs = require('fs')

describe('test generator', () => {
  it('should produce same prisma ts file for same Prisma schema', () => {
    const content = fs.readFileSync('./prisma-nestjs-graphql/prisma/affected-rows.output.ts', {
      encoding: 'utf8',
    })
    expect(content).toMatchSnapshot()
  })

  it('should produce same user ts file for same Prisma schema', () => {
    const content = fs.readFileSync('./prisma-nestjs-graphql/user/aggregate-user.output.ts', {
      encoding: 'utf8',
    })
    expect(content).toMatchSnapshot()
  })
})
