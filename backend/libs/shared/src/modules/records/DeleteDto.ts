import { IsBoolean, IsOptional } from 'class-validator';

export class DeleteDto {
  @IsBoolean()
  readonly hardDelete: boolean;

  @IsOptional()
  @IsBoolean()
  readonly deleteRelated?: boolean;
}
