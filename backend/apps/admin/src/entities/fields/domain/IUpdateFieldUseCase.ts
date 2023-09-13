import { UseCase } from '@shared/modules/core/UseCase';
import { UpdateFieldDto } from '../dtos/UpdateFieldDto';

export type UpdateFieldInput = {
  fieldId: string;
  data: UpdateFieldDto;
};

export interface IUpdateFieldUseCase
  extends UseCase<UpdateFieldInput, Promise<number>> {}
