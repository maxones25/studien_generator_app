import { CreateRecordDto, RecordFieldDto } from '../dtos/CreateRecordDto';
import { EntityField } from '@entities';
import { Record } from '@entities';
import { RecordField } from '@entities';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { FieldType } from '@shared/enums/field-type.enum';
import { Transaction } from '@shared/modules/transaction/transaction';
import { Form } from '@entities';
import { FormField, Task } from '@entities';
import datetime from '@shared/modules/datetime/datetime';

export class CreateRecordTransaction extends Transaction<
  {
    data: CreateRecordDto;
    participantId: string;
  },
  void
> {
  formFieldsRepository: Repository<FormField>;

  protected async execute({
    data,
    participantId,
  }: {
    data: CreateRecordDto;
    participantId: string;
  }): Promise<void> {
    // if(! await this.isCorrectForm(data.formId, data.fields.map((value) => value.entityFieldId)))
    //   throw new ConflictException('invalid form');
    
    if (data.taskId) {
      const tasksRepository = this.entityManager.getRepository(Task);
      const task = await tasksRepository.findOne({where: {
        id: data.taskId,
      }});
      if (task.deletedAt != undefined)
        throw new ConflictException('task was deleted');
      tasksRepository.update(data.taskId, { completedAt: data.createdAt });
    }

    const formRepository = this.entityManager.getRepository(Form);
    const form = await formRepository.findOne({where: {
      id: data.formId,
    }})
    if (form.deletedAt != undefined)
     throw new ConflictException('form was deleted');

    const record = await this.createRecord(data, participantId);

    this.formFieldsRepository = this.entityManager.getRepository(FormField);

    const promises = data.fields.map((recordField) =>
      this.addRecordField(record.id, recordField),
    );

    await Promise.all(promises).catch(() => {
      throw new ConflictException('invalid record field');
    });

  }

  private async createRecord(
    { id, formId, createdAt, taskId, failureReason }: CreateRecordDto,
    participantId: string,
  ): Promise<Record> {
    const recordsRepository = this.entityManager.getRepository(Record);

    if (
      datetime.addTime(datetime.currentDate(), { hours: 3, minutes: 0 }) <
      datetime.addOffset(new Date(createdAt))
    )
      throw new ConflictException('record in future error');

    const record = new Record();
    record.id = id;
    record.createdAt = createdAt;
    record.formId = formId;
    record.taskId = taskId;
    record.participantId = participantId;
    record.failureReason = failureReason;

    await recordsRepository.insert(record);

    return record;
  }

  private async addRecordField(
    recordId: string,
    { formFieldId, value }: RecordFieldDto,
  ) {
    const recordFieldRepository = this.entityManager.getRepository(RecordField);

    if (!(await this.isValidValue({ formFieldId, value })))
      throw new ConflictException('invalid record field');

    if (!value) return;

    const encodedValue = JSON.stringify(value) as any;

    recordFieldRepository.insert({
      recordId,
      formFieldId,
      value: encodedValue,
    });
  }

  private async isCorrectForm(formId: string, entityFieldIds: string[]) {
    const formRepository = this.entityManager.getRepository(Form);

    const result = await formRepository.findOne({
      where: {
        id: formId,
      },
      relations: {
        pages: {
          components: {
            formFields: true,
          },
        },
      },
      select: {
        id: true,
        pages: {
          id: true,
          components: {
            id: true,
            formFields: {
              entityFieldId: true,
            },
          },
        },
      },
    });

    const flatResult = result.pages
      .map((page) =>
        page.components.map((component) =>
          component.formFields.map((formField) => formField.entityFieldId),
        ),
      )
      .flat(Infinity);
    if (flatResult.toString() === entityFieldIds.toString()) return true;
    return false;
  }

  private async isValidValue({ formFieldId, value }: RecordFieldDto): Promise<any> {
    const formField = await this.formFieldsRepository.findOneOrFail({
      where: { id: formFieldId },
      relations: {
        entityField: true,
        formComponent: {
          attributes: true,
        },
      },
      select: {
        id: true,
        entityField: {
          id: true,
          type: true,
        },
        formComponent: {
          id: true,
          attributes: {
            key: true,
            value: true,
          },
        },
      },
    });

    const isRequired: boolean = formField.formComponent.attributes.find(
      ({ key }) => key === 'required',
    )?.value;
    if (!value && !isRequired) return true;

    const type = formField.entityField.type.toString().toLowerCase();

    switch (formField.entityField.type) {
      case FieldType.Number:
      case FieldType.Boolean:
        if (typeof value === type) return true;
      case FieldType.Date:
      case FieldType.DateTime:
      case FieldType.Time:
        if (new Date(value).toString() !== 'Invalid Date') return true;
      case FieldType.Text:
        if (typeof value === 'string') return true;
      default:
        return false;
    }
  }
}
