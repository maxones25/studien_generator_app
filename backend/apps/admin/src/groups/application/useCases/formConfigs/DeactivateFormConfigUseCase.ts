import {
  DeactivateFormConfigUseCaseInput,
  FormConfigIsAlreadyInactiveError,
  IDeactivateFormConfigUseCase,
  IGroupsRepository,
} from '@admin/groups/domain';

export class DeactivateFormConfigUseCase
  implements IDeactivateFormConfigUseCase
{
  constructor(private readonly groupsRepository: IGroupsRepository) {}

  async execute({
    formConfigId,
  }: DeactivateFormConfigUseCaseInput): Promise<any> {
    const formConfig = await this.groupsRepository.getFormConfigById(
      formConfigId,
    );

    if (!formConfig.isActive) throw new FormConfigIsAlreadyInactiveError();

    return this.groupsRepository.deactivateFormConfig(formConfigId);
  }
}
