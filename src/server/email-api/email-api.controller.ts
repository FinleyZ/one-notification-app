import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { EmailApiService } from './email-api.service';
import { EmailDto } from './dto';
import { ParseIntPipe } from '@nestjs/common';

@Controller('email-api')
export class EmailApiController {
  constructor(private emailApiService: EmailApiService) {}

  //mocking the send email
  @Post('send-email')
  public async sendEmail(@Body() dto: EmailDto) {
    return await this.emailApiService.sendMail(dto);
  }

  @Get('emails/:id')
  public async getEmail(@Param('id', ParseIntPipe) id: string) {
    return await this.emailApiService.getEmail(id);
  }
}
