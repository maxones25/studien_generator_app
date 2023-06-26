import { IsString, IsNotEmpty } from 'class-validator';

export class GroupDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
