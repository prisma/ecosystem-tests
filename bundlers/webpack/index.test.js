const { spawnSync } = require('child_process')

test('test Prisma Client CRUD after bundling with webpack', async () => {
  const p = spawnSync('node', ['dist/main.js'], {
    encoding: 'utf8',
  })
  console.log(p.stdout)
  const data = JSON.parse(p.stdout)
  expect(data.createUser.name).toBe('Alice')
  expect(data.updateUser.name).toBe('Bob')
  expect(data.deleteManyUsers.count).toBe(1)
})
