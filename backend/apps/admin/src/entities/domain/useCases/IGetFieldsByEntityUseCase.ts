import { UseCase } from '@shared/modules/core';
import { Field } from '@admin/entities/domain';

export const GET_FIELDS_BY_ENTITY_USE_CASE = 'GET_FIELDS_BY_ENTITY_USE_CASE';

export type GetFieldsByEntityUseCaseInput = {
  entityId: string;
};

export interface IGetFieldsByEntityUseCase
  extends UseCase<GetFieldsByEntityUseCaseInput, Promise<Field[]>> {}
