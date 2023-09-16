import {
  Director,
  GetDirectorsNotMemberOfStudyUseCaseInput,
  IDirectorsRepository,
  IGetDirectorsNotMemberOfStudyUseCase,
} from '@admin/directors/domain';

export class GetDirectorsNotMemberOfStudyUseCase
  implements IGetDirectorsNotMemberOfStudyUseCase
{
  constructor(private readonly directorsRepository: IDirectorsRepository) {}

  execute({
    studyId,
  }: GetDirectorsNotMemberOfStudyUseCaseInput): Promise<Director[]> {
    return this.directorsRepository.getNonMembersOfStudy(studyId);
  }
}
