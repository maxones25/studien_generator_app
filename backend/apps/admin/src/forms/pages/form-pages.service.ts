import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { FormPage } from '@entities/form-page.entity';
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

  async create(formId: string) {
    const number = await this.formPagesRepository.getNextNumber(formId);

    const formPage = new FormPage();

    formPage.formId = formId;
    formPage.number = number;

    await this.formPagesRepository.insert(formPage);

    return {
      id: formPage.id,
      number: formPage.number,
    };
  }

  async getAll(formId: string) {
    return this.formPagesRepository.getAll(formId);
  }

  async delete(formId:string, id: string) {
    if(await this.formPagesRepository.isLastPage(formId)) throw new BadRequestException("form must have one page")
    return new DeleteFormPageTransaction(this.entityManager).run(id);
  }
}
