import { IFormsRepository } from '@admin/forms/forms/domain';
import {
  GetAvailableFormsByGroupUseCaseInput,
  IGetAvailableFormsByGroupUseCase,
} from '@admin/groups/domain';
import { Form } from '@entities/core/form';

export class GetAvailableFormsByGroupUseCase
  implements IGetAvailableFormsByGroupUseCase
{
  constructor(private readonly formsRepository: IFormsRepository) {}

  execute({
    studyId,
    groupId,
  }: GetAvailableFormsByGroupUseCaseInput): Promise<Form[]> {
    return this.formsRepository.getAvailableForms(studyId, groupId);
  }
}
