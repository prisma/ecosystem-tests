import { PhotonService } from './../../services/photon.service';
import { PaginationArgs } from './../../models/args/pagination-args';
import { PostIdArgs } from './../../models/args/postid-args';
import { UserIdArgs } from '../../models/args/userid-args';
import {
  Resolver,
  Query,
  ResolveProperty,
  Parent,
  Args
} from '@nestjs/graphql';
import { Post } from './../../models/post';

@Resolver(of => Post)
export class PostResolver {
  constructor(private photon: PhotonService) {}
}
