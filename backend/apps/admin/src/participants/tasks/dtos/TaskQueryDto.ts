import { IsUUID } from 'class-validator';

export class TaskQueryDto {
  @IsUUID()
  readonly taskId: string;
}
