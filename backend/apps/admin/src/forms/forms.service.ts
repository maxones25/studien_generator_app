import { Inject, Injectable } from '@nestjs/common';
import { Form } from '@entities/form.entity';
import { CreateFormDto } from './dtos/CreateFormDto';
import { UpdateFormDto } from './dtos/UpdateFormDto';
import { FormsRepository } from './forms.repository';
import { CreateFormTransaction } from './transactions/CreateFormTransaction';

@Injectable()
export class FormsService {
  constructor(
    @Inject(FormsRepository)
    private formsRepository: FormsRepository,
    @Inject(CreateFormTransaction)
    private createFormTransaction: CreateFormTransaction,
  ) {}

  async create(studyId: string, data: CreateFormDto) {
    return this.createFormTransaction.run({studyId, data})
  }

  getAll(studyId: string) {
    return this.formsRepository.getAll(studyId);
  }

  getById(id: string) {
    return this.formsRepository.getById(id);
  }

  update(id: string, { name }: UpdateFormDto) {
    return this.formsRepository.update(id, { name });
  }

  delete(id: string) {
    return this.formsRepository.delete(id);
  }
}
