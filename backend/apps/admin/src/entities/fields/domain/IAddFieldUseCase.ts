import { UseCase } from '@shared/modules/core/UseCase';
import { CreateFieldDto } from '../dtos/CreateFieldDto';

export type AddFieldInput = {
  entityId: string;
  data: CreateFieldDto;
};

export interface IAddFieldUseCase
  extends UseCase<AddFieldInput, Promise<string>> {}
