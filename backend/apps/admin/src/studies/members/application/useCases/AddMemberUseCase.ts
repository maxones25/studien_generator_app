import {
  AddMemberUseCaseInput,
  IAddMemberUseCase,
  IMembersRepository,
  Member,
} from '@admin/studies/members/domain';

export class AddMemberUseCase implements IAddMemberUseCase {
  constructor(private readonly membersRepository: IMembersRepository) {}

  execute({ directorId, studyId, role }: AddMemberUseCaseInput): Promise<void> {
    const member = new Member({ studyId, directorId, role });
    return this.membersRepository.addMember(member);
  }
}
