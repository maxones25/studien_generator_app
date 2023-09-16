import { UseCaseError } from "@shared/modules/core";

export class InvalidFieldError extends UseCaseError {
    constructor(){
        super("field is not valid")
    }
}