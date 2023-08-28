import { FormConfigType } from '@shared/enums/form-config-type.enum';
import { Transform } from 'class-transformer';
import { IsBooleanString, IsEnum, IsOptional } from 'class-validator';

export class GetByGroupQueryDto {
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase() === 'true')
  readonly isActive?: boolean;

  @IsOptional()
  @IsEnum(FormConfigType)
  readonly type?: FormConfigType;
}
