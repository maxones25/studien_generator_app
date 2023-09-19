import {
  AddFormConfigUseCaseInput,
  FormAlreadyAddedToGroupError,
  IAddFormConfigUseCase,
  IGroupsRepository,
} from '@admin/groups/domain';
import { FormConfig, FormConfigType } from '@entities/core/group';
import { Id } from '@shared/modules/core';

export class AddFormConfigUseCase implements IAddFormConfigUseCase {
  constructor(private readonly groupsRepository: IGroupsRepository) {}

  async execute({
    studyId,
    groupId,
    formId,
  }: AddFormConfigUseCaseInput): Promise<Id> {
    const formConfigs = await this.groupsRepository.getFormConfigs(
      groupId,
      formId,
    );

    if (formConfigs.length > 1) throw new FormAlreadyAddedToGroupError();

    const type = this.getType(formConfigs);

    const formConfig = new FormConfig({
      groupId,
      formId,
      studyId,
      isActive: false,
      type,
    });

    return await this.groupsRepository.createFormConfig(formConfig);
  }

  private getType(formConfigs: FormConfig[]) {
    const config = formConfigs[0];

    return formConfigs.length === 0
      ? FormConfigType.TimeDependent
      : config.type === FormConfigType.TimeDependent
      ? FormConfigType.TimeIndependent
      : FormConfigType.TimeDependent;
  }
}
