import { PrismaService } from './../../services/prisma.service';
import {
  Resolver,
} from '@nestjs/graphql';
import { Post } from './../../models/post';

@Resolver(of => Post)
export class PostResolver {
  constructor(private client: PrismaService) {}
}
