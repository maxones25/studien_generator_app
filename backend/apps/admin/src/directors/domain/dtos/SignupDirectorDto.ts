import { IsString, IsNotEmpty } from 'class-validator';
import { CreateDirectorDto } from './CreateDirectorDto';

export class SignupDirectorDto extends CreateDirectorDto {
  @IsString()
  @IsNotEmpty()
  readonly activationPassword: string;
}
