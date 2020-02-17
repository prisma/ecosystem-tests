import { Resolver, Query, Args } from '@nestjs/graphql';
import { PrismaService } from './../services/prisma.service';

@Resolver()
export class AppResolver {
  constructor(private client: PrismaService) {}

  @Query(returns => String)
  helloWorld(): string {
    return 'Hello World!';
  }
  @Query(returns => String)
  async hello(@Args('name') name: string): Promise<string> {
    const users = await this.client.user.findMany({});
    return `Hello ${name}, first name: ${users[0].firstname}!`;
  }
}
