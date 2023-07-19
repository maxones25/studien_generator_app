import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from 'src/entities/form.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private formsRepository: Repository<Form>,
  ) {}

  getById(id: string) {
    return this.formsRepository.findOne({
      where: {
        id,
      },
    });
  }
}
