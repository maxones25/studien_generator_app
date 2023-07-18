import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from 'src/entities/form.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateFormDto } from './dtos/CreateFormDto';
import { UpdateFormDto } from './dtos/UpdateFormDto';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private formsRepository: Repository<Form>,
  ) {}

  async create(studyId: string, { name }: CreateFormDto) {
    const form = new Form();

    form.name = name;
    form.studyId = studyId;

    await this.formsRepository.insert(form);

    return form;
  }

  getAll(studyId: string) {
    return this.formsRepository.find({
      where: {
        studyId,
      },
    });
  }

  getById(id: string) {
    return this.formsRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: string, { name }: UpdateFormDto) {
    return this.formsRepository.update(id, { name });
  }

  delete(id: string) {
    return this.formsRepository.delete(id);
  }
}
