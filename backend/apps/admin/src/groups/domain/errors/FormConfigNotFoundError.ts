import { UseCaseError } from "@shared/modules/core";

export class FormConfigNotFoundError extends UseCaseError {
    constructor(){
        super("")
    }
}