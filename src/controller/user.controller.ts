import { Controller, Get, Query, Req } from '@nestjs/common';
import {ShowLoggerService} from '../services/show.logger.service';

@Controller('users')
export class UserController {
constructor(private loggerService: ShowLoggerService){}

  @Get()
  async getUsers(@Query('level') level: string, @Query('uuid') uuid: string, @Req() req) {
    return await this.loggerService.intervalConsulConfigJobHttp(level, uuid);
  }
}