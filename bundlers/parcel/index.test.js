const { spawnSync } = require('child_process')

test('test Prisma Client CRUD after bundling with parcel', async () => {
  const p = spawnSync('node', ['dist/index.js'], {
    encoding: 'utf8',
  })
  const data = JSON.parse(p.stdout)
  expect(data.createUser.name).toBe('Alice')
  expect(data.updateUser.name).toBe('Bob')
  expect(data.deleteManyUsers.count).toBe(1)
})
