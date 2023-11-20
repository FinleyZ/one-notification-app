import { Module } from '@nestjs/common';
import { EmailApiService } from './email-api.service';
import { ConfigService } from '@nestjs/config';
import { EmailApiController } from './email-api.controller';

@Module({
  providers: [EmailApiService, ConfigService],
  controllers: [EmailApiController],
})
export class EmailApiModule {}
