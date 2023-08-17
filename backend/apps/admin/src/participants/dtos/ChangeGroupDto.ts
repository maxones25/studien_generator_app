import { IsUUID } from 'class-validator';

export class ChangeGroupDto {
  @IsUUID()
  readonly groupId: string;
}
