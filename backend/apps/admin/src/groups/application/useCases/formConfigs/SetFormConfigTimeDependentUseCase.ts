import {
  FormConfigIsAlreadyTimeDependentError,
  IGroupsRepository,
  ISetFormConfigTimeDependentUseCase,
  SetFormConfigTimeDependentUseCaseInput,
} from '@admin/groups/domain';
import { FormConfigType } from '@entities/core/group';
import { UpdatedResult } from '@shared/modules/core';

export class SetFormConfigTimeDependentUseCase
  implements ISetFormConfigTimeDependentUseCase
{
  constructor(private readonly groupsRepository: IGroupsRepository) {}

  async execute({
    formConfigId,
  }: SetFormConfigTimeDependentUseCaseInput): Promise<UpdatedResult> {
    const formConfig = await this.groupsRepository.getFormConfigById(
      formConfigId,
    );

    if (formConfig.type === FormConfigType.TimeDependent)
      throw new FormConfigIsAlreadyTimeDependentError();

    const existsAlready =
      await this.groupsRepository.hasGroupFormWithType(
        formConfig.groupId,
        formConfig.formId,
        FormConfigType.TimeDependent,
      );

    if (existsAlready)
      throw new FormConfigIsAlreadyTimeDependentError();

    return await this.groupsRepository.setFormConfigType(
      formConfigId,
      FormConfigType.TimeDependent,
    );
  }
}
