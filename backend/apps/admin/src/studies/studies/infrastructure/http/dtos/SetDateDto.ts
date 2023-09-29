import { IsISO8601 } from 'class-validator';

export class SetDateDto {
  @IsISO8601()
  readonly date: string;
}
