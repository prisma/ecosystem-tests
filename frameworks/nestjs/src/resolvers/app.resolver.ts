import { Resolver, Query, Args } from '@nestjs/graphql';
import { PhotonService } from './../services/photon.service';

@Resolver()
export class AppResolver {
  constructor(private photon: PhotonService) {}

  @Query(returns => String)
  helloWorld(): string {
    return 'Hello World!';
  }
  @Query(returns => String)
  async hello(@Args('name') name: string): Promise<string> {
    const users = await this.photon.user.findMany({});
    return `Hello ${name}, first name: ${users[0].firstname}!`;
  }
}
