import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmailApiService } from './email-api.service';
import { EmailDto } from './dto';

@Controller('email-api')
export class EmailApiController {
  constructor(private emailApiService: EmailApiService) {}
  
  //mocking the send email
  @Post('send-email')
  public async sendEmail(@Body() dto: EmailDto) {
    await this.emailApiService.sendMail(dto);
  }

  // public async sendEmail(@Body() dto: EmailDto) {
  //     await this.emailApiService.sendMail(EmailDto);
  // }
}
