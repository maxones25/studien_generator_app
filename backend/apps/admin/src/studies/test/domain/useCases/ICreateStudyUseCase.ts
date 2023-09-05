import { UseCase } from '@admin/studies/shared/UseCase';

export type CreateStudyInput = {
  name: string;
  directorId: string;
};

export interface ICreateStudyUseCase
  extends UseCase<CreateStudyInput, Promise<string>> {}
