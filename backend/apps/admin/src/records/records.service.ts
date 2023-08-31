import { Injectable, Inject } from '@nestjs/common';
import { RecordsRepository, TransformedRecord } from './records.repository';
import { RecordsQueryDto } from './dtos/RecordsQueryDto';
import { ExportParamsDto, TableColumnDto } from './dtos/ExportParamsDto';
import datetime from '@shared/modules/datetime/datetime';

@Injectable()
export class RecordsService {
  constructor(
    @Inject(RecordsRepository)
    private recordsRepository: RecordsRepository,
  ) {}

  get(studyId: string, query: RecordsQueryDto) {
    return this.recordsRepository.get(studyId, query);
  }

  async export(
    studyId: string,
    { columns, entityId, participantId, groupId, formId }: ExportParamsDto,
  ) {
    const records = await this.recordsRepository.get(studyId, {
      entityId,
      participantId,
      groupId,
      formId,
    });

    const header = columns
      .map((column) => this.wrapValue(column.name))
      .join(';');

    const body = records
      .map((record) =>
        columns
          .map((column) => {
            const value = this.getColumnValue(column.id, record);
            const sanitizedValue = this.sanitizeValue(value, column);
            return this.wrapValue(sanitizedValue);
          })
          .join(';'),
      )
      .join('\n');

    return header + '\n' + body;
  }

  private getColumnValue(column: string, record: TransformedRecord): any {
    const keys = column.split('.');

    let value = record;

    for (const key of keys) {
      if (value === null || typeof value !== 'object') {
        return undefined;
      }
      value = value[key];
    }

    return value;
  }

  private sanitizeValue(value: any, column: TableColumnDto) {
    switch (column.type) {
      case 'DateTime':
        return datetime.formatDateTime(value);
      case 'Date':
        return datetime.formatDate(value);
      case 'Time':
        return datetime.formatTime(value);
      default:
        return value;
    }
  }

  private wrapValue(value: any) {
    return `"${value}"`;
  }
}
