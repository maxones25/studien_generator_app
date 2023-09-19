import { UseCaseError } from "@shared/modules/core";

export class FormConfigIsAlreadyInactiveError extends UseCaseError {
    constructor(){
        super("")
    }
}