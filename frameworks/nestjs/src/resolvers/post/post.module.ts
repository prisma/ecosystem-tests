import { PrismaService } from './../../services/prisma.service';
import { PostResolver } from './post.resolver';
import { Module } from '@nestjs/common';

@Module({
  providers: [PostResolver, PrismaService]
})
export class PostModule {}
