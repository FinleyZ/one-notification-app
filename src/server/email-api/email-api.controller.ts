import { Controller, Get } from '@nestjs/common';
import { EmailApiService } from './email-api.service';

@Controller('email-api')
export class EmailApiController {
  constructor(private emailApiService: EmailApiService) {}
  //mocking the send email
  @Get('send-email')
  public async sendEmail() {
    await this.emailApiService.sendMail();
  }

  // public async sendEmail(@Body() dto: EmailDto) {
  //     await this.emailApiService.sendMail(EmailDto);
  // }
}
