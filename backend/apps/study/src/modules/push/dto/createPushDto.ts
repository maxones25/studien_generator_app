import { IsJSON, IsNotEmpty } from "class-validator";

export class CreatePushDto {
  @IsJSON()
  @IsNotEmpty()
  subscription: string
}