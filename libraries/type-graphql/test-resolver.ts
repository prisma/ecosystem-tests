import { PrismaClient } from '@prisma/client'
import {
  Resolver,
  Query,
} from 'type-graphql'

const client = new PrismaClient()

@Resolver()
export class TestResolver {
  @Query(returns => String, { nullable: true })
  async test(): Promise<String | undefined> {
    try {
      await client.user.create({
        data: {
          email: 'john@example.com',
          name: 'John Doe',
        },
      })
    } catch (err) {}

    const result = await client.user.findMany({
      where: {
        email: 'john@example.com',
      },
    })

    return JSON.stringify(result);
  }
}
