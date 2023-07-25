import { Type } from "class-transformer";
import { 
  ArrayMinSize, 
  IsArray, 
  IsDate, 
  IsNotEmpty, 
  IsString, 
  IsUUID, 
  ValidateNested 
} from "class-validator";

export class CreateRecordDto {
  taskId?: string;

  @IsString()
  @IsNotEmpty()
  formId: string;

  @Type(() => Date)
  @IsDate()
  createdAt: Date;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => RecordFieldDto)
  @ValidateNested({ each: true })
  fields: RecordFieldDto[];
}

export class RecordFieldDto {
  @IsUUID()
  entityFieldId: string;

  @IsNotEmpty()
  value: any;
}