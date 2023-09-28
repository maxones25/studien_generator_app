import { UseCaseError } from "@shared/modules/core";

export class FlexibleDailyIsInvalidError extends UseCaseError {
    constructor(){
        super("")
    }
}