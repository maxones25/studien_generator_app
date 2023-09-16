import { CreateEntityDto } from '@admin/entities/infrastructure/http/dtos/CreateEntityDto';
import { Id, UseCase } from '@shared/modules/core';

export const CREATE_ENTITY_USE_CASE = 'CREATE_ENTITY_USE_CASE';

export type CreateEntityUseCaseInput = {
  studyId: string;
  data: CreateEntityDto;
};

export interface ICreateEntityUseCase
  extends UseCase<CreateEntityUseCaseInput, Promise<Id>> {}
