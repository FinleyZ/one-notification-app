import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { EmailApiService } from './email-api.service';
import { EmailDto } from './dto';
import { ApiKeyGuard } from '../guards/api-key.guard';

@Controller('email-api')
export class EmailApiController {
  constructor(private emailApiService: EmailApiService) {}

  //mocking the send email
  @Post('send-email')
  @UseGuards(ApiKeyGuard)
  public async sendEmail(@Body() dto: EmailDto) {
    return await this.emailApiService.sendMail(dto);
  }

  @Get('emails/:id')
  @UseGuards(ApiKeyGuard)
  public async getEmail(@Param('id') id: string) {
    return await this.emailApiService.getEmail(id);
  }
}
