import { UseCaseError } from "@shared/modules/core";

export class GroupNotFoundError extends UseCaseError {
    constructor(){
        super("")
    }
}