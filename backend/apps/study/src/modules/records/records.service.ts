import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Record } from '@entities';
import { Between, EntityManager, Repository } from 'typeorm';
import { CreateRecordDto } from './dtos/CreateRecordDto';
import { CreateRecordTransaction } from './transactions/create.record.transaction';

@Injectable()
export class RecordsService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectRepository(Record)
    private recordsRepository: Repository<Record>,
  ) {}

  async create(participantId: string, data: CreateRecordDto) {
    return new CreateRecordTransaction(this.entityManager).run({
      participantId,
      data,
    });
  }

  async findAll(participantId: string, updatedAt?: Date) {
    const records = await this.recordsRepository.find({
      where: {
        participantId,
      },
      relations: {
        form: true,
        fields: true,
      },
    });

    const filteredRecords = records.filter(
      ({ modifiedAt }) => !updatedAt || modifiedAt >= updatedAt,
    );

    return filteredRecords.map(({ id, taskId, createdAt, form, fields, formId }) => {
      return {
        id,
        taskId,
        createdAt,
        formId,
        name: form.name,
        fields,
      };
    });
  }

  async findRecordedEventsByDate(participantId: string, date: Date) {
    const dateStart = new Date(date);
    dateStart.setHours(0, 0, 0, 0); // Beginn des heutigen Tages

    const dateEnd = new Date(date);
    dateEnd.setHours(23, 59, 59, 999);

    const records = await this.recordsRepository.find({
      where: {
        participantId,
        createdAt: Between(dateStart, dateEnd),
      },
      relations: {
        form: true,
      },
      select: {
        form: {
          name: true,
        },
      },
    });

    return records.map((record) => {
      return { name: record.form.name, id: record.id, date: record.createdAt };
    });
  }
}
