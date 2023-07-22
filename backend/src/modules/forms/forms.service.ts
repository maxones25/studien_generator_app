import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from 'src/entities/form.entity';
import { Repository } from 'typeorm';
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

    return form.id;
  }

  getAll(studyId: string) {
    return this.formsRepository.find({
      where: {
        studyId,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  getById(id: string) {
    return this.formsRepository.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
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
