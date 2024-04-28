import { Inject, Injectable } from '@nestjs/common';
import { CreateFormComponentDto } from '../dtos/CreateFormComponentDto';
import { AddComponentTransaction } from '../transactions/AddComponentTransaction';
import { ComponentsRepository } from '../repositories/components.repository';
import { IGetStudyRelatedDataUseCase } from '@shared/modules/records/StudyRelatedDataAccessor';
import { RemoveComponentTransaction } from '../transactions/RemoveComponentTransaction';
import { UpdateComponentTransaction } from '../transactions/UpdateComponentTransaction';
import { UpdateComponentSequenceDto } from '../dtos/UpdateComponentSequenceDto';
import { UpdateComponentSequenceTransaction } from '../transactions/UpdateComponentSequencTransaction';

@Injectable()
export class ComponentsService implements IGetStudyRelatedDataUseCase {
  constructor(
    @Inject(ComponentsRepository)
    private componentsRepository: ComponentsRepository,
    @Inject(AddComponentTransaction)
    private addComponentTransaction: AddComponentTransaction,
    @Inject(UpdateComponentTransaction)
    private updateComponentTransaction: UpdateComponentTransaction,
    @Inject(UpdateComponentSequenceTransaction)
    private updateComponentSequenceTransaction: UpdateComponentSequenceTransaction,
    @Inject(RemoveComponentTransaction)
    private readonly deleteComponentTransaction: RemoveComponentTransaction,
  ) {}

  async execute(studyId: string, id: string): Promise<any> {
    return this.componentsRepository.getRelatedByStudy(studyId, id);
  }

  async add(pageId: string, data: CreateFormComponentDto) {
    const number = await this.componentsRepository.getNextNumber(pageId);

    return this.addComponentTransaction.run({
      pageId,
      number,
      data,
    });
  }

  async getByPage(pageId: string) {
    return this.componentsRepository.getByPage(pageId);
  }

  async update(id: string, formId: string, attributes: Record<string, any>) {
    return this.updateComponentTransaction.run({ id, formId, attributes });
  }

  async updateSequence(data: UpdateComponentSequenceDto, formId: string) {
    return this.updateComponentSequenceTransaction.run({ data, formId });
  }

  async remove(pageId: string, id: string) {
    return this.deleteComponentTransaction.run({ id, pageId });
  }
}
