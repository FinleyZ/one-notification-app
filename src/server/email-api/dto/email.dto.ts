import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, IsJSON } from 'class-validator';


export class EmailDto {
    @IsEmail()
    @IsNotEmpty()
    recipient: string;
  
    @IsEmail()
    @IsNotEmpty()
    sender: User;
  
    @IsString()
    @IsNotEmpty()
    subject: string;
  
    @IsString()
    @IsNotEmpty()
    content: string;
  
    @IsJSON()
    attachments: JSON;
  
    //may have to add template and context
  }
  