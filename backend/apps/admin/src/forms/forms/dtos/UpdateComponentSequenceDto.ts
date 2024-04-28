import { Type } from "class-transformer";
import { IsArray, IsNumber, IsUUID, ValidateNested } from "class-validator";

export class UpdateComponentSequenceDto {
  @IsArray()
  @Type(() => FormComponentDto)
  @ValidateNested({ each: true })
  components: FormComponentDto[];
}

export class FormComponentDto {
  @IsUUID()
  id: string;
}