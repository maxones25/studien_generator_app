import { Inject, Injectable } from '@nestjs/common';
import { Form } from '@entities/form.entity';
import { CreateFormDto } from './dtos/CreateFormDto';
import { UpdateFormDto } from './dtos/UpdateFormDto';
import { FormsRepository } from './forms.repository';

@Injectable()
export class FormsService {
  constructor(
    @Inject(FormsRepository)
    private formsRepository: FormsRepository,
  ) {}

  async create(studyId: string, { name }: CreateFormDto) {
    const form = new Form();

    form.name = name;
    form.studyId = studyId;

    await this.formsRepository.insert(form);

    return form.id;
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
