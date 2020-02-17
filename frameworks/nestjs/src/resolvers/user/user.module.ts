import { PrismaService } from './../../services/prisma.service';
import { UserResolver } from './user.resolver';
import { Module } from '@nestjs/common';

@Module({
  providers: [UserResolver, PrismaService]
})
export class UserModule {}
