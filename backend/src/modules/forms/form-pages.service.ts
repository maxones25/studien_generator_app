import { ConflictException, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, EntityManager, Repository } from 'typeorm';
import { FormPage } from '../../entities/form-page.entity';
import { CreateFormPageDto } from './dtos/CreateFormPageDto';
import { UpdateFormPageDto } from './dtos/UpdateFormPageDto';

@Injectable()
export class FormPagesService {
  constructor(
    @InjectRepository(FormPage)
    private formPagesRepository: Repository<FormPage>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async create(formId: string, { title }: CreateFormPageDto) {
    const formPages = await this.formPagesRepository.find({
      where: { formId },
    });

    const formPage = new FormPage();

    formPage.formId = formId;
    formPage.title = title;
    formPage.number = formPages.length + 1;

    await this.formPagesRepository.insert(formPage);

    return formPage.id;
  }

  getAll(formId: string) {
    return this.formPagesRepository.find({
      where: { formId },
      select: {
        id: true,
        title: true,
      },
      order: {
        number: 'ASC',
      },
    });
  }

  update(id: string, { title }: UpdateFormPageDto) {
    return this.formPagesRepository.update(id, { title });
  }

  async delete(id: string) {
    return this.entityManager.transaction<DeleteResult>(
      async (entityManager) => {
        const formPagesRepo = await entityManager.getRepository(FormPage);

        const formPage = await formPagesRepo.findOne({ where: { id } });

        if (!formPage) throw new ConflictException('page not found');

        const result = await formPagesRepo.delete(id);

        const formPages = await formPagesRepo.find({
          where: { formId: formPage.formId },
          order: {
            number: 'ASC',
          },
        });

        const updatedFormPages = formPages.map((formPage, i) => {
          formPage.number = i + 1;
          return formPage;
        });

        await formPagesRepo.save(updatedFormPages);

        return result;
      },
    );
  }
}
