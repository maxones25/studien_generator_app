import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormConfiguration } from 'src/entities/form-configuration.entity';
import { Form } from 'src/entities/form.entity';
import { FormConfigType } from 'src/enums/form-config-type.enum';
import { Not, Repository } from 'typeorm';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private formsRepository: Repository<Form>,
    @InjectRepository(FormConfiguration)
    private formsConfigurationRepository: Repository<FormConfiguration>,
  ) {}

  async getAll(studyId: string, groupId: string) {
    const forms = await this.formsConfigurationRepository.find({
      where: [{
        studyId,
        isActive: true,
        groupId: null,
      }, {
        studyId,
        isActive: true,
        groupId: groupId,
      }],
      relations: {
        form: true
      },
      select: {
        form: {        
          name: true,
          id: true,
        }
      }
    });

    return forms.map((formConfig) => formConfig.form);
  }

  async getAllTimeIndependent(studyId: string, groupId: string) {
    const forms = await this.formsConfigurationRepository.find({
      where: [{
        studyId,
        isActive: true,
        groupId: null,
        type: Not(FormConfigType.TimeDependent),
      }, {
        studyId,
        isActive: true,
        groupId: groupId,
        type: Not(FormConfigType.TimeDependent),
      }],
      relations: {
        form: true
      },
      select: {
        form: {        
          name: true,
          id: true,
        }
      }
    });

    return forms.map((formConfig) => formConfig.form);
  }

  async getById(formId: string) {
    const form = await this.formsRepository.findOne({
      where: {
        id: formId,
      },
      relations: {
        pages: {
          components: {
            formFields: true
          }
        },
      },
      select: {
        id: true,
        name: true,
        pages: {
          title: true,
          number: true,
          components: {
            type: true,
            number: true,
            formFields: {
              entityFieldId: true
            }
          }
        }
      },
      order: {
        pages: {
          number: "ASC",
          components: {
            number: "ASC"
          }
        }
      }
    });

    return form
  }
}
