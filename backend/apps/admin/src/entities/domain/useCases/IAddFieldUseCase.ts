import { UseCase } from '@shared/modules/core/UseCase';
import { Field } from '@admin/entities/domain';

export const ADD_FIELD_USE_CASE = "ADD_FIELD_USE_CASE";

export type AddFieldInput = {
  field: Field;
};

export interface IAddFieldUseCase
  extends UseCase<AddFieldInput, Promise<string>> {}
