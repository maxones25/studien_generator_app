import { IsOptional, IsUUID } from 'class-validator';

export class GetAllFormConfigurationsQueryParams {
  @IsOptional()
  @IsUUID()
  readonly groupId: string;
}
