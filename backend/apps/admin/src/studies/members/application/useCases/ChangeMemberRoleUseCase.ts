import {
  AdminRequiredError,
  ChangeMemberRoleUseCaseInput,
  IChangeMemberRoleUseCase,
  IMembersRepository,
  Member,
} from '@admin/studies/members/domain';
import { Roles } from '@entities/core/study';

export class ChangeMemberRoleUseCase implements IChangeMemberRoleUseCase {
  constructor(private readonly membersRepository: IMembersRepository) {}

  async execute({
    studyId,
    directorId,
    role,
  }: ChangeMemberRoleUseCaseInput): Promise<number> {
    const member = new Member({ studyId, directorId, role });
    if (role === Roles.Employee) {
      const isLastAdmin = await this.membersRepository.isMemberLastAdmin(
        studyId,
        directorId,
      );

      if (isLastAdmin) throw new AdminRequiredError();
    }

    return this.membersRepository.changeMemberRole(member);
  }
}
