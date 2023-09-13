import { UseCase } from '@shared/modules/core/UseCase';
import { CreateFormDto } from '../dtos/CreateFormDto';

export type CreateFormInput = {
  studyId: string;
  data: CreateFormDto;
};

export interface ICreateFormUseCase
  extends UseCase<CreateFormInput, Promise<string>> {}
