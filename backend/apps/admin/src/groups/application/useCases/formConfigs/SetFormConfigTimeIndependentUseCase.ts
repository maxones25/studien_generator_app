import {
  FormConfigIsAlreadyTimeIndependentError,
  IGroupsRepository,
  ISetFormConfigTimeIndependentUseCase,
  SetFormConfigTimeIndependentUseCaseInput,
} from '@admin/groups/domain';
import { FormConfigType } from '@entities/core/group';

export class SetFormConfigTimeIndependentUseCase
  implements ISetFormConfigTimeIndependentUseCase
{
  constructor(private readonly groupsRepository: IGroupsRepository) {}

  async execute({
    formConfigId,
  }: SetFormConfigTimeIndependentUseCaseInput): Promise<number> {
    const formConfig = await this.groupsRepository.getFormConfigById(
      formConfigId,
    );

    if (formConfig.type === FormConfigType.TimeIndependent)
      throw new FormConfigIsAlreadyTimeIndependentError();

    return await this.groupsRepository.setFormConfigType(
      formConfigId,
      FormConfigType.TimeIndependent,
    );
  }
}
