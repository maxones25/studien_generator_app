import {
  CreateEntityUseCaseInput,
  ICreateEntityUseCase,
} from '@admin/entities/domain';

export class CreateEntityUseCase implements ICreateEntityUseCase {
  execute({ studyId, data }: CreateEntityUseCaseInput): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
