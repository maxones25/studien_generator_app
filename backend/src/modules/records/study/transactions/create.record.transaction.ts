import { Transaction } from "../../../../utils/transaction";
import { CreateRecordDto, RecordFieldDto } from "../dtos/createRecordDto";
import { EntityField } from "../../../../entities/entity-field.entity";
import { Record } from "../../../../entities/record.entity";
import { RecordField } from "../../../../entities/record-field.entity";
import { Repository } from "typeorm";
import { ConflictException } from "@nestjs/common";
import { FieldType } from "src/enums/field-type.enum";

export class CreateRecordTransaction extends Transaction<
  {
    data: CreateRecordDto,
    participantId: string,
  }, 
  void
> {
  entityFieldRepository: Repository<EntityField>

  protected async execute({
    data, 
    participantId
  }: {
    data: CreateRecordDto, 
    participantId: string
  }): Promise<void> {
    const record = await this.createRecord(data, participantId);
    this.entityFieldRepository = this.entityManager.getRepository(EntityField);
    
    const promises = data.fields.map((recordField) => this.addRecordField(record.id, recordField))

    await Promise.all(promises).catch(() => {
      throw new ConflictException('invalid record field')
    });
  }

  private async createRecord(
    { formId, createdAt, taskId }: CreateRecordDto,
    participantId: string
  ): Promise<Record> {
    const recordsRepository = this.entityManager.getRepository(Record)

    const record = new Record();
    record.createdAt = createdAt;
    record.formId = formId;
    record.taskId = taskId;
    record.participantId = participantId;

    await recordsRepository.insert(record);

    return record
  }

  private async addRecordField(
    recordId: string, 
    recordField: RecordFieldDto,
  ) {
    const recordFieldRepository = this.entityManager.getRepository(RecordField);

    if (!await this.isValidValue(recordField)) 
      throw new ConflictException('invalid record field');

    recordFieldRepository.insert({
      recordId,
      value: recordField.value,
      entityFieldId: recordField.entityFieldId,
    });
  }

  private async isValidValue(
    {entityFieldId, value}: RecordFieldDto,
  ): Promise<any> {
    const entityField = await this.entityFieldRepository.findOne({
      where: {id: entityFieldId}
    })

    const type = entityField?.type.toString().toLowerCase()
    
    switch (entityField?.type) {
      case FieldType.Number || FieldType.Boolean:
        if (typeof value !== type) 
          return false;
      case FieldType.Date || FieldType.DateTime || FieldType.Time:
        if (new Date(value).toString() === "Invalid Date")
          return false;
      case FieldType.Enum || FieldType.Text:
        if (typeof value !== "string")
          return false;
      default:
        break;
    }
    return true; 
  }

}