const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')

export default async (req, res) => {
  try {
    const client = new PrismaClient({
      adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
    })

    await client.user.deleteMany({})

    await client.user.create({
      data: {
        id: '1234567890',
        email: 'alice@prisma.io',
        nick: 'al',
        name: 'Alice',
      },
    })
  } catch (e) {
    return res.status(500).json({ value: e.message })
  }

  return res.status(200).json({ value: true })
}
