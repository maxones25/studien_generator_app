import { IsUUID } from 'class-validator';

export class GroupQueryDto {
  @IsUUID()
  readonly groupId: string;
}
