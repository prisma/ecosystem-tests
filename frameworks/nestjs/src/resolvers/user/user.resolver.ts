import { PhotonService } from './../../services/photon.service';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { Resolver, Query, ResolveProperty, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from '../../decorators/user.decorator';
import { User } from './../../models/user';

@Resolver(of => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private photon: PhotonService) {}
}
