require('./tracing')
const Fastify = require('fastify')
const { PrismaClient } = require('@prisma/client')

const app = Fastify()
app.register(require('fastify-express'))

const prisma = new PrismaClient()

app.get('/users', async (_, reply) => {
  const users = await prisma.user.findMany()

  reply.send(users)
})

async function main() {
  try {
    await app.listen(4000)
  } catch (error) {
    console.log('error starting app')
    throw error
  }
}

main()
