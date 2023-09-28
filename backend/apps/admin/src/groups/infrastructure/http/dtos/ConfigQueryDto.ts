import { IsUUID } from 'class-validator';

export class ConfigQueryDto {
  @IsUUID()
  readonly configId: string;
}
