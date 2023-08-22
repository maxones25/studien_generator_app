import { CreateStudyDto } from '../dtos/CreateStudyDto';
import { Study } from '@entities/study.entity';
import { StudyMember } from '@entities/study-member.entity';
import { Transaction } from '@shared/modules/transaction/transaction';
import { Roles } from '@admin/roles/roles.enum';

export class CreateStudyTransaction extends Transaction<
  {
    directorId: string;
    data: CreateStudyDto;
  },
  string
> {
  protected async execute({
    directorId,
    data,
  }: {
    directorId: string;
    data: CreateStudyDto;
  }): Promise<string> {
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
      role: Roles.admin,
    });
  }
}
