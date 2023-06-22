import { IsNotEmpty, IsString } from "class-validator";

export class LoginDirectorDto {
  @IsString()
  @IsNotEmpty()
  readonly email: string;
  
  @IsString()
  @IsNotEmpty()
  readonly password: string;
  }