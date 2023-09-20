import { IsInt, Min } from 'class-validator';

export class PostponeDto {
  @IsInt()
  @Min(1)
  times: number;

  @IsInt()
  @Min(1)
  duration: number;
}
