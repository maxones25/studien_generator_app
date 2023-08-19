import { CreateRecordDto, RecordFieldDto } from '../dtos/CreateRecordDto';
import { EntityField } from '@entities/entity-field.entity';
import { Record } from '@entities/record.entity';
import { RecordField } from '@entities/record-field.entity';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { FieldType } from '@shared/enums/field-type.enum';
import { Transaction } from '@shared/modules/transaction/transaction';
import { Form } from '@entities/form.entity';

export class CreateRecordTransaction extends Transaction<
  {
    data: CreateRecordDto;
    participantId: string;
  },
  void
> {
  entityFieldRepository: Repository<EntityField>;

  protected async execute({
    data,
    participantId,
  }: {
    data: CreateRecordDto;
    participantId: string;
  }): Promise<void> {

    // if(! await this.isCorrectForm(data.formId, data.fields.map((value) => value.entityFieldId)))
    //   throw new ConflictException('invalid form');

    const record = await this.createRecord(data, participantId);

    this.entityFieldRepository = this.entityManager.getRepository(EntityField);
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

    if (new Date(createdAt) > new Date())
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

  private async addRecordField(recordId: string, recordField: RecordFieldDto) {
    const recordFieldRepository = this.entityManager.getRepository(RecordField);

    if (!(await this.isValidValue(recordField)))
      throw new ConflictException('invalid record field');

    recordFieldRepository.insert({
      recordId,
      value: recordField.value,
      entityFieldId: recordField.entityFieldId,
    });
  }

  private async isCorrectForm(
    formId: string,
    entityFieldIds: string[]
  ) {
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
            id:true,
            formFields: {
              entityFieldId: true,
            },
          },
        },
      },
    })
    const flatResult = result.pages.map((page) => 
      page.components.map((component) => 
        component.formFields.map((formField) => 
          formField.entityFieldId))).flat(Infinity);
    if (flatResult.toString() === entityFieldIds.toString())
      return true;
    return false;
  }

  private async isValidValue({
    entityFieldId,
    value,
  }: RecordFieldDto): Promise<any> {
    const entityField = await this.entityFieldRepository.findOneOrFail({
      where: { id: entityFieldId },
    });

    const type = entityField.type.toString().toLowerCase();
    
    switch (entityField.type) {
      case FieldType.Number:
      case FieldType.Boolean:
        if (typeof value === type) return true;
      case FieldType.Date: 
      case FieldType.DateTime:
      case FieldType.Time:
        if (new Date(value).toString() !== 'Invalid Date') return true;
      case FieldType.Enum:
      case FieldType.Text:
        if (typeof value === 'string') return true;
      default:
        return false;
    }
  }
}
