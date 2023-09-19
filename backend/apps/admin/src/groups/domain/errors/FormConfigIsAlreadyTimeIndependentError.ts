import { UseCaseError } from "@shared/modules/core";

export class FormConfigIsAlreadyTimeIndependentError extends UseCaseError {
    constructor(){
        super("")
    }
}