import { IsOptional, IsUUID } from 'class-validator';

export class GetFormsQueryParamsDto {
  @IsOptional()
  @IsUUID()
  readonly groupId?: string;
}
