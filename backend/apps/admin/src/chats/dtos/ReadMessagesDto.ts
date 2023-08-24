import { Type } from "class-transformer";
import { IsDate } from "class-validator";

export class ReadMessagesDto {
  @Type(() => Date)
  @IsDate()
  readonly readAt: Date;
}