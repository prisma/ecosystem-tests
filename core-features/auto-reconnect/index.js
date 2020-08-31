const { PrismaClient } = require('@prisma/client')

const client = new PrismaClient()

async function main() {
  try {
    const data1 = await client.user.findMany({
      where: {
        id: 'x',
      },
    })
    console.log(data1)

    await client.$disconnect()

    const data2 = await client.user.findMany({
      where: {
        id: 'x',
      },
    })
    console.log(data2)
  } catch (e) {
    console.log(e)
  }
}

if (require.main === module) {
  main()
    .then((_) => {})
    .catch((e) => {
      console.log(e)
    })
    .finally(() => {
      client.$disconnect()
    })
}

module.exports = {
  client,
}
