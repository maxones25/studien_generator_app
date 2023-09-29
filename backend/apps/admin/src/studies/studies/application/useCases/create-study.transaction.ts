import { Study } from '@entities';
import { StudyMember } from '@entities';
import { Transaction } from '@shared/modules/transaction/transaction';
import { CreateStudyDto } from '../../infrastructure/http';
import { Roles } from '@entities/core/study';

type CreateStudyInput = {
  directorId: string;
  data: CreateStudyDto;
};

export class CreateStudyTransaction extends Transaction<
  CreateStudyInput,
  string
> {
  protected async execute({
    directorId,
    data,
  }: CreateStudyInput): Promise<string> {
    const study = await this.createStudy(data);

    await this.addDirectorAsAdminMember(study.id, directorId);

    return study.id;
  }

  private async createStudy({ name }: CreateStudyDto) {
    const studiesRepository = this.entityManager.getRepository(Study);

    const study = new Study();
    study.name = name;

    await studiesRepository.insert(study);

    return study;
  }

  private async addDirectorAsAdminMember(studyId: string, directorId: string) {
    const studyMemberRepository = this.entityManager.getRepository(StudyMember);

    await studyMemberRepository.insert({
      directorId,
      studyId,
      role: Roles.Admin,
    });
  }
}
