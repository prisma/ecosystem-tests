import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello/:name')
  async getHelloName(@Param('name') name: string): Promise<string> {
    return this.appService.getHelloName(name);
  }
}
