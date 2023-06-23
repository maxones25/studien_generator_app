import { IsString, IsNotEmpty } from "class-validator";

export class CreateStudyDto{
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}