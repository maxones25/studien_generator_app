import { IsInt, Min } from "class-validator";

export class SetDurationDto {
    @IsInt()
    @Min(1)
    readonly duration: number;
}