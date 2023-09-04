import { Type } from "class-transformer";
import { 
  ArrayMinSize, 
  IsArray, 
  IsDate, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  IsUUID, 
  ValidateNested 
} from "class-validator";

export class CreateRecordDto {
  @IsUUID()
  id: string

  @IsOptional()
  @IsUUID()
  taskId?: string;

  @IsUUID()
  formId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  failureReason?: string;

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
  id: string;

  @IsOptional()
  value: any;
}