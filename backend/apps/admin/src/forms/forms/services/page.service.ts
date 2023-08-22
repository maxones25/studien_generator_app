import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { CreateFormDto } from '../dtos/CreateFormDto';
import { FormsRepository } from '../repositories/forms.repository';
import { CreateFormTransaction } from '../transactions/CreateFormTransaction';
import { StudyRelatedDataAccessor } from '@shared/modules/records/StudyRelatedDataAccessor';
import { PagesRepository } from '../repositories/pages.repository';
import { DeletePageTransaction } from '../transactions/DeletePageTransaction';

@Injectable()
export class PagesService implements StudyRelatedDataAccessor {
  constructor(
    @Inject(PagesRepository)
    private pagesRepository: PagesRepository,
    @Inject(DeletePageTransaction)
    private deletePageTransaction: DeletePageTransaction,
  ) {}

  async getRelatedByStudy(studyId: string, id: string): Promise<any> {
    return this.pagesRepository.getRelatedByStudy(studyId, id);
  }

  async add(formId: string) {
    const number = await this.pagesRepository.getNextNumber(formId);
    const { id } = await this.pagesRepository.create({ formId, number });
    return { id, number };
  }

  async getByForm(formId: string) {
    return this.pagesRepository.getByForm(formId);
  }

  async remove(formId: string, pageId: string) {
    if (await this.pagesRepository.isLastPage(formId))
      throw new BadRequestException('form must have one page');

    return this.deletePageTransaction.run(pageId);
  }
}
