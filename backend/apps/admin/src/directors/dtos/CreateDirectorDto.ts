import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateDirectorDto {
  @IsString()
  @IsEmail()
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
  @MinLength(8)
  readonly password: string;
}
