import {
  AdminRequiredError,
  IMembersRepository,
  IRemoveMemberUseCase,
  RemoveMemberUseCaseInput,
} from '@admin/studies/members/domain';
import { DeletedResult } from '@shared/modules/core';

export class RemoveMemberUseCase implements IRemoveMemberUseCase {
  constructor(private readonly membersRepository: IMembersRepository) {}

  async execute({
    studyId,
    directorId,
  }: RemoveMemberUseCaseInput): Promise<DeletedResult> {
    const isLastAdmin = await this.membersRepository.isMemberLastAdmin(
      studyId,
      directorId,
    );

    if (isLastAdmin) throw new AdminRequiredError();

    return this.membersRepository.removeMember(studyId, directorId);
  }
}
