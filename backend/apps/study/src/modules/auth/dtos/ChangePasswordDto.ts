import { IsOptional, IsString, MinLength } from "class-validator";

export class ChangePasswordDto {
    @IsOptional()
    @IsString()
    @MinLength(8)
    oldPassword?: string;

    @IsString()
    @MinLength(8)
    newPassword: string;

    @IsString()
    @MinLength(8)
    repeatPassword: string;
}