import { IsUUID } from "class-validator";

export class AddFormToGroupQueryDto {
    @IsUUID()
    readonly groupId: string;

    @IsUUID()
    readonly formId: string;
}