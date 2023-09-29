import { UseCaseError } from "@shared/modules/core";

export class EndBeforeStartError extends UseCaseError {
    constructor(){
        super("")
    }
}