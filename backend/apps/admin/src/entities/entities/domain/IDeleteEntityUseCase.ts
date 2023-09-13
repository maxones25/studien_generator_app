import { Id } from '@shared/modules/core/Id';
import { UseCase } from '@shared/modules/core/UseCase';

export type DeleteEntityInput = {
  entityId: Id;
};

export interface IDeleteEntityUseCase
  extends UseCase<DeleteEntityInput, Promise<number>> {}
