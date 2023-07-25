import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateStudyDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
