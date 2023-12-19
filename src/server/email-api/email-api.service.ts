import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';
import { EmailDto } from './dto/email.dto';
import { PrismaService } from '../prisma/prisma.service';

//https://blog.iamstarcode.com/how-to-send-emails-using-nestjs-nodemailer-smtp-gmail-and-oauth2
@Injectable()
export class EmailApiService { 
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
    private prisma: PrismaService,
  ) {}

  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      this.configService.get('CLIENT_ID'),
      this.configService.get('CLIENT_SECRET'),
      'https://developers.google.com/oauthplayground',
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.log(err);
          reject('Failed to create access token :(');
        }
        resolve(token);
      });
    });

    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('EMAIL'),
        clientId: this.configService.get('CLIENT_ID'),
        clientSecret: this.configService.get('CLIENT_SECRET'),
        accessToken,
      },
    };
    this.mailerService.addTransporter('gmail', config);
  }

  //Save the email to the database
  private async saveEmail(dto: EmailDto) {
    await this.prisma.emailNotifications.create({
      data: {
        recipient: dto.recipient,
        subject: dto.subject,
        content: dto.content,
      },
    });
  }

  public async sendMail(dto: EmailDto) {
    await this.setTransport();
    this.mailerService
      .sendMail({
        transporterName: 'gmail',
        to: dto.recipient, // receiver
        //cc: dto.sender.email, 
        from: 'robot.fin.one@gmail.com', // sender address
        subject: dto.subject, // Subject line
        text: dto.content, // plaintext body
        html: `<p>${dto.content}</p>`, // HTML body content
      })
      .then((success) => {
        console.log(success);
        this.saveEmail(dto);
        dto.status = 'sent';
      })
      .catch((err) => {
        //need error handling here
        console.log('Failed to sent email :(');
        console.log(err);

        dto.status = 'sent';
      });
  }
}
