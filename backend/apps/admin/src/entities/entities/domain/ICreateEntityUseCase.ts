import { Id } from '@shared/modules/core/Id';
import { UseCase } from '@shared/modules/core/UseCase';
import { CreateEntityDto } from './dtos/CreateEntityDto';

export type CreateEntityInput = {
  studyId: string;
  data: CreateEntityDto;
};

export interface ICreateEntityUseCase
  extends UseCase<CreateEntityInput, Promise<Id>> {}
