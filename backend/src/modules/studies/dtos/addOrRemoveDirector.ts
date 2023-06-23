import { IsString, IsNotEmpty } from "class-validator";
import { Roles } from "src/enums/roles.enum";

export class AddOrRemoveDirector{
    @IsString()
    @IsNotEmpty()
    readonly directorId: string;

    @IsString()
    @IsNotEmpty()
    readonly role: Roles;
}