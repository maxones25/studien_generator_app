import { Inject, Injectable } from '@nestjs/common';
import { ConfigsRepository } from '../repositories/configs.repository';
import { IGetStudyRelatedDataUseCase } from '@shared/modules/records/StudyRelatedDataAccessor';
import { GetByGroupQueryDto } from '../dtos/GetByGroupQueryDto';

@Injectable()
export class ConfigsService implements IGetStudyRelatedDataUseCase {
  constructor(
    @Inject(ConfigsRepository)
    private formConfigsRepository: ConfigsRepository,
  ) {}

  execute(studyId: string, id: string): Promise<any> {
    return this.formConfigsRepository.getRelatedByStudy(studyId, id);
  }

  async getByGroup(groupId: string, query: GetByGroupQueryDto) {
    return this.formConfigsRepository.getByGroup(groupId, query);
  }

}
