import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

async function main() {
  await client.user.deleteMany({})

  const rand = Math.random().toString()

  await client.user.create({
    data: {
      id: rand,
      email: 'alice@prisma.io' + rand,
      name: 'Alice',
    },
  })

  await client.$disconnect()
}

main().catch(async e => {
  console.error(e)
  await client.$disconnect()
  process.exit(1)
})
