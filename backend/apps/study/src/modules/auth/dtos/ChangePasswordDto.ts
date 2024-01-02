import { IsString, MinLength } from "class-validator";

export class ChangePasswordDto {
    @IsString()
    @MinLength(8)
    oldPassword: string;

    @IsString()
    @MinLength(8)
    newPassword: string;

    @IsString()
    @MinLength(8)
    repeatPassword: string;
}