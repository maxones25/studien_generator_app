import { Transform } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export class DeletedDto {
  @IsBoolean()
  @Transform(({ value }) => {
    if(value === undefined) return false;
    if(value === "true") return true
    if(value === "false") return false;
    return value;
  })
  readonly deleted: boolean;
}
