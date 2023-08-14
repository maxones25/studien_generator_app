import { IsUUID } from "class-validator";

export class GetAllSchedulesQueryParams {
    @IsUUID()
    formId: string;
}