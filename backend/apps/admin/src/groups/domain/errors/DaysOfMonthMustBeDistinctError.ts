import { UseCaseError } from "@shared/modules/core";

export class DaysOfMonthMustBeDistinctError extends UseCaseError {
    constructor(){
        super("")
    }
}