import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { FormPage } from '../../../entities/form-page.entity';
import { CreateFormPageDto } from './dtos/CreateFormPageDto';
import { UpdateFormPageDto } from './dtos/UpdateFormPageDto';
import { DeleteFormPageTransaction } from './transactions/DeleteFormPageTransaction';
import { FormPagesRepository } from './form-pages.repository';

@Injectable()
export class FormPagesService {
  constructor(
    @Inject(FormPagesRepository)
    private formPagesRepository: FormPagesRepository,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async create(formId: string, { title }: CreateFormPageDto) {
    const number = await this.formPagesRepository.getNextNumber(formId);

    const formPage = new FormPage();

    formPage.formId = formId;
    formPage.title = title;
    formPage.number = number;

    await this.formPagesRepository.insert(formPage);

    return formPage.id;
  }

  async getAll(formId: string) {
    return this.formPagesRepository.getAll(formId);
  }

  async update(id: string, { title }: UpdateFormPageDto) {
    return this.formPagesRepository.update(id, { title });
  }

  async delete(id: string) {
    return new DeleteFormPageTransaction(this.entityManager).run(id);
  }
}
