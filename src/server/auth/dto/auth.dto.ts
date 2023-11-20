import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class EmailDto {
  @IsEmail()
  @IsNotEmpty()
  receivers: string;

  @IsEmail()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  //may have to add template and context
}
