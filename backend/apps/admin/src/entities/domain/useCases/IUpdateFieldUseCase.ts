import { UseCase } from '@shared/modules/core/UseCase';
import { Field } from '@admin/entities/domain';

export const UPDATE_FIELD_USE_CASE = 'UPDATE_FIELD_USE_CASE';

export type UpdateFieldInput = {
  field: Field;
};

export interface IUpdateFieldUseCase
  extends UseCase<UpdateFieldInput, Promise<number>> {}
