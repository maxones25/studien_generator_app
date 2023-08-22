import { IsUUID } from 'class-validator';

export class FormQueryDto {
  @IsUUID()
  readonly formId: string;
}
