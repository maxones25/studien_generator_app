import { IsString, IsNotEmpty } from "class-validator";

export class TransferAdminDto{
    @IsString()
    @IsNotEmpty()
    readonly studyId: string;

    @IsString()
    @IsNotEmpty()
    readonly oldAdminId: string;
    
    @IsString()
    @IsNotEmpty()
    readonly newAdminId: string;
}