import { PrismaClient } from '@prisma/client'

const client = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

// A `main` function so that we can use async/await
async function main() {
  console.log("deleteMany")
  await client.user.deleteMany({})

  const objectId = '6d795f757365725f69643030'

  console.log("create")
  await client.user.create({
    data: {
      id: objectId,
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  })

  console.log("findUnique")
  const user = await client.user.findUnique({
    where: {
      id: objectId,
    },
  })

  const expect = JSON.stringify({
    id: objectId,
    email: 'alice@prisma.io',
    name: 'Alice',
  })

  if (JSON.stringify(user) !== expect) {
    console.error('expected', expect, 'got', user)
    process.exit(1)
  }

  console.log('success')

  await client.$disconnect()
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await client.$disconnect()
  })
