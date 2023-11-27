import { PrismaClient } from "sub-project-1";

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

main()
  .catch(async e => {
    console.error(e)

    process.exit(1)
  })
  .finally(async () => {
    await client.$disconnect()
  })
