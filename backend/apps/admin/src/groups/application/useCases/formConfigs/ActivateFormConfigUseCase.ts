import {
  ActivateFormConfigUseCaseInput,
  FormConfigIsAlreadyActiveError,
  IActivateFormConfigUseCase,
  IGroupsRepository,
} from '@admin/groups/domain';

export class ActivateFormConfigUseCase implements IActivateFormConfigUseCase {
  constructor(private readonly groupsRepository: IGroupsRepository) {}

  async execute({
    formConfigId,
  }: ActivateFormConfigUseCaseInput): Promise<number> {
    const formConfig = await this.groupsRepository.getFormConfigById(
      formConfigId,
    );

    if (formConfig.isActive) throw new FormConfigIsAlreadyActiveError();

    return this.groupsRepository.activateFormConfig(formConfigId);
  }
}
