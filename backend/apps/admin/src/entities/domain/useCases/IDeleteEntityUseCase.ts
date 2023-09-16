import { Id } from '@shared/modules/core/Id';
import { UseCase } from '@shared/modules/core/UseCase';

export const DELETE_ENTITY_USE_CASE = 'DELETE_ENTITY_USE_CASE';

export type DeleteEntityInput = {
  entityId: Id;
};

export interface IDeleteEntityUseCase
  extends UseCase<DeleteEntityInput, Promise<number>> {}
