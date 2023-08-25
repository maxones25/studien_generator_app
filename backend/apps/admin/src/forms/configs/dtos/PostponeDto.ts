import { IsInt, Min } from 'class-validator';

export class PostponeDto {
  @IsInt()
  @Min(0)
  times: number;

  @IsInt()
  @Min(0)
  duration: number;
}
