describe('prisma generate', () => {

  it('creates a package.json', async () => {
    const pkgjson = require('./package.json')
    expect(pkgjson).toBeTruthy()
  })

  it('adds @prisma/client to package.json', async () => {
    const pkgjson = require('./package.json')
    expect(pkgjson.dependencies["@prisma/client"]).toBeTruthy()
  })

  it('adds prisma to package.json', async () => {
    const pkgjson = require('./package.json')
    expect(pkgjson.devDependencies["prisma"]).toBeTruthy()
  })

})
