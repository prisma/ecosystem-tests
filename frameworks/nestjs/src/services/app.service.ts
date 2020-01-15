import { Injectable } from '@nestjs/common';
import { PhotonService } from './photon.service';

@Injectable()
export class AppService {
  constructor(private photon: PhotonService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getHelloName(name: string): Promise<string> {
    const users = await this.photon.users.findMany({});
    return `Hello ${name}, first name: ${users[0].firstname}!`;
  }
}
