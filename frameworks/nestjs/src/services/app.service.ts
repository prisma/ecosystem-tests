import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private client: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getHelloName(name: string): Promise<string> {
    const users = await this.client.user.findMany({});
    return `Hello ${name}, first name: ${users[0].firstname}!`;
  }
}
