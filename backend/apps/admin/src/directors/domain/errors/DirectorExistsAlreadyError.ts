import { UseCaseError } from '@shared/modules/core';

export class DirectorExistsAlreadyError extends UseCaseError {
    constructor(){
        super("director exists already");
    }
}
