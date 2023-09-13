import { UseCase } from "@shared/modules/core/UseCase";

export type ChangeNameInput = {
    entityId: string;
    name: string;
};

export interface IChangeNameUseCase extends UseCase<ChangeNameInput, Promise<number>> {}