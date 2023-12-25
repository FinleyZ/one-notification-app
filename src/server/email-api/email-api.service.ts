import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
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
    try {
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
            reject('Failed to create access token for oauth2');
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
    } catch (error) {
      throw new UnauthorizedException('Something bad happened', {
        cause: new Error(),
        description: 'Error setting up transporter smtp-transport',
      });
    }
  }

  //Save the email to the database
  private async saveEmail(dto: EmailDto) {
    try {
      const emailRecord = await this.prisma.emailNotifications.create({
        data: {
          recipient: dto.recipient,
          subject: dto.subject,
          content: dto.content,
        },
      });
      return emailRecord;
    } catch (error) {
      console.log(error);
    }
  }

  //update the email in the database
  private async updateEmailStatus(emailRecord, status) {
    const updatedEmailRecord = await this.prisma.emailNotifications.update({
      where: { id: emailRecord.id },
      data: { status: status },
    });
    return updatedEmailRecord;
  }

  //Send the email
  public async sendMail(dto: EmailDto) {
    const emailRecord = await this.saveEmail(dto);
    try {
      await this.setTransport();
      await this.mailerService.sendMail({
        transporterName: 'gmail',
        to: dto.recipient,
        from: 'robot.fin.one@gmail.com',
        subject: dto.subject,
        text: dto.content,
        html: `<p>${dto.content}</p>`,
      });
      const updatedEmailRecord = await this.updateEmailStatus(
        emailRecord,
        'sent',
      );
      return updatedEmailRecord;
    } catch (err) {
      const updatedEmailRecord = await this.updateEmailStatus(
        emailRecord,
        'failed',
      );
      if (err instanceof UnauthorizedException) {
        throw new UnauthorizedException({
          message: 'Email failed to send',
          description: 'Failed setting up transporter smtp-transport.',
          emailRecord: updatedEmailRecord,
        });
      }
      throw new BadRequestException(
        'Something bad happened',
        'Error sending email',
      );
    }
  }

  //get email by id
  public async getEmail(id: string) {
    const emailRecord = await this.prisma.emailNotifications.findUnique({
      where: { id: id },
    });
    return emailRecord;
  }
}
