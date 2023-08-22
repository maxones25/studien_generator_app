import { IsUUID } from 'class-validator';

export class ComponentQueryDto {
  @IsUUID()
  readonly componentId: string;
}
