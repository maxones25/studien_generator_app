import { IsUUID } from 'class-validator';

export class GetFormsByGroupQueryDto {
  @IsUUID()
  groupId: string;
}
