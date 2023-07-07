import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from 'src/entities/form.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateFormDto } from './dtos/CreateFormDto';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private formsRepository: Repository<Form>,
  ) {}

  async getGroupForm(entityId: string, groupId: string) {
    const form = await this.formsRepository.findOne({
      where: {
        entityId,
        groupId,
      },
    });

    if (!form) throw new ConflictException();

    return form;
  }

  async getStudyForm(entityId: string) {
    const form = await this.formsRepository.findOne({
      where: {
        entityId,
        groupId: IsNull(),
      },
    });

    if (!form) throw new ConflictException("");

    return form;
  }

  async create(entityId: string, { active, data, groupId }: CreateFormDto) {
    const activeForm = await this.findOneActive(entityId, groupId);

    if (activeForm !== null) throw new ConflictException();

    const form = new Form();

    form.active = active;
    form.data = data;
    form.entityId = entityId;
    form.groupId = groupId;

    await this.formsRepository.insert(form);

    return form;
  }

  private async findOneActive(entityId: string, groupId: string) {
    return this.formsRepository.findOne({
      where: [
        {
          entityId,
          groupId,
          active: true,
        },
        {
          entityId,
          groupId: IsNull(),
          active: true,
        },
      ],
    });
  }
}
