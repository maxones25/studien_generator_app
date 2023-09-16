import { UseCaseError } from '@shared/modules/core/UseCaseError';

export class DirectorNotFoundError extends UseCaseError {
    constructor(){
        super("director not found");
    }
}
