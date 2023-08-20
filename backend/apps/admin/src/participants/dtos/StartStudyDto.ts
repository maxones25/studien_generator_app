import { IsDateString } from "class-validator";

export class StartStudyDto {

    @IsDateString()
    readonly startDate: string;
}