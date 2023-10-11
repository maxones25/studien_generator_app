import {
  IGetStudyRelatedMemberUseCase,
  IMembersRepository,
} from '@admin/studies/members/domain';

export class GetStudyRelatedMemberUseCase
  implements IGetStudyRelatedMemberUseCase
{
  constructor(private readonly membersRepository: IMembersRepository) {}

  execute(studyId: string, directorId: string): Promise<any> {
    return this.membersRepository.getMemberByStudy(studyId, directorId);
  }
}
