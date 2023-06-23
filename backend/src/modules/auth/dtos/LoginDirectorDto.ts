import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDirectorDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  
  @IsString()
  @IsNotEmpty()
  readonly password: string;
  }