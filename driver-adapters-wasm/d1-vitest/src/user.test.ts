import { env } from "cloudflare:test"
import { getPrisma } from "./prismaClient"

describe('user model', () => { 
  let prisma = getPrisma(env.D1_DATABASE)

  beforeEach(async () => {
    await prisma.user.deleteMany()
  })

  test('create user', async () => { 
    let user = await prisma.user.create({data: {name: 'Paul Atreides'}})

    expect(user.name).toEqual('Paul Atreides')
  })
})
