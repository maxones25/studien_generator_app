import { IsInt, Min } from 'class-validator';

export class RestrictDto {
  @IsInt()
  @Min(0)
  before: number;

  @IsInt()
  @Min(0)
  after: number;
}
