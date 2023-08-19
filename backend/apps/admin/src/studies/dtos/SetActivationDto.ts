import { IsBoolean } from 'class-validator';

export class SetActivationDto {
  @IsBoolean()
  readonly isActive: boolean;
}
