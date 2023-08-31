import { IsBoolean } from 'class-validator';

export class DeleteDto {
  @IsBoolean()
  readonly hardDelete: boolean;
}
