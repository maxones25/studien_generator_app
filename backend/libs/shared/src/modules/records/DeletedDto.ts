import { Transform } from 'class-transformer';

export class DeletedDto {
  @Transform(({ value }) => value.toLowerCase() === 'true')
  readonly deleted: boolean;
}
