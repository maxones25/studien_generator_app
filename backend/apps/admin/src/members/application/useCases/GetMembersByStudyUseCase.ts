import {
  GetMembersByStudyUseCaseInput,
  IGetMembersByStudyUseCase,
  IMembersRepository,
  Member,
} from '@admin/members/domain';

export class GetMembersByStudyUseCase implements IGetMembersByStudyUseCase {
  constructor(private readonly membersRepository: IMembersRepository) {}

  execute({ studyId }: GetMembersByStudyUseCaseInput): Promise<Member[]> {
    return this.membersRepository.getMembersByStudy(studyId);
  }
}
