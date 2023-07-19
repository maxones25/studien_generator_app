import { IsOptional, IsUUID } from 'class-validator';

export class GetFieldQueryParamsDto {
  @IsUUID()
  @IsOptional()
  readonly groupId?: string;
}
