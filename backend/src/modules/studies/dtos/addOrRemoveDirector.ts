import { IsString, IsNotEmpty } from "class-validator";

export class AddOrRemoveDirector{
    @IsString()
    @IsNotEmpty()
    readonly studyId: string;
    
    @IsString()
    @IsNotEmpty()
    readonly employeeId: string;
}