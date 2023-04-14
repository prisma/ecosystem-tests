const { PrismaClient } = require('@prisma/client')

export default async (req, res) => {
  try {
    const client = new PrismaClient()

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
