import { Type } from "class-transformer";
import { IsDate, IsUUID } from "class-validator";

export class ReadMessagesDto {
  @Type(() => Date)
  @IsDate()
  readonly readAt: Date;
}