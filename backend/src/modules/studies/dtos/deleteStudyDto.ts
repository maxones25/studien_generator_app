import { IsNotEmpty, IsString } from "class-validator";

export class DeleteStudyDto{
    @IsString()
    @IsNotEmpty()
    readonly id: string;
}