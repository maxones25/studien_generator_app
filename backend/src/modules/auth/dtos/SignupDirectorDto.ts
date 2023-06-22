import { IsString, IsNotEmpty } from "class-validator";

export class SignupDirectors {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
  
  @IsString()
  @IsNotEmpty()
  readonly activationPassword: string;
  }