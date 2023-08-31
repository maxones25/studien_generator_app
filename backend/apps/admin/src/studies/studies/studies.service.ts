import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CreateStudyDto } from './dtos/CreateStudyDto';
import { CreateStudyTransaction } from './transactions/create-study.transaction';
import { StudyAttributesRepository } from './repositories/study-attributes.repository';
import datetime from '@shared/modules/datetime/datetime';
import { SetDurationDto } from './dtos/SetDurationDto';
import { StudiesRepository } from './repositories/studies.repository';
import { StudyAttributes } from '@entities';

@Injectable()
export class StudiesService {
  constructor(
    @Inject(StudiesRepository)
    private studiesRepository: StudiesRepository,
    @Inject(StudyAttributesRepository)
    private attributesRepository: StudyAttributesRepository,
    @Inject(CreateStudyTransaction)
    private createStudyTransaction: CreateStudyTransaction,
  ) {}

  async create(directorId: string, data: CreateStudyDto) {
    return this.createStudyTransaction.run({
      directorId,
      data,
    });
  }

  async activate(studyId: string) {
    if (!(await this.attributesRepository.isSet(studyId, 'startDate')))
      throw new BadRequestException('startDate must be set');

    if (!(await this.attributesRepository.isSet(studyId, 'endDate')))
      throw new BadRequestException('endDate must be set');

    if (!(await this.attributesRepository.isSet(studyId, 'duration')))
      throw new BadRequestException('duration must be set');

    this.attributesRepository.set(studyId, 'isActive', true);
  }

  async deactivate(studyId: string) {
    this.attributesRepository.set(studyId, 'isActive', false);
  }

  async changeName(id: string, name: string) {
    return await this.studiesRepository.update(id, { name });
  }

  async getByDirector(directorId: string) {
    return await this.studiesRepository.getByDirector(directorId);
  }

  async getByOneDirector(studyId: string, directorId: string) {
    const study = await this.studiesRepository.getOneByDirector(
      studyId,
      directorId,
    );
    const attributes = await this.attributesRepository.getAll(studyId);

    const status = this.generateStatus(study, attributes);

    return {
      status,
      ...study,
      ...attributes,
    };
  }

  async getById(studyId: string) {
    const study = await this.studiesRepository.getById(studyId);

    if (study === null) return null;

    const attributes = await this.attributesRepository.getAll(studyId);

    return {
      ...study,
      ...attributes,
    };
  }

  async isDeleted(id: string) {
    const study = await this.studiesRepository.getById(id);
    return study.isDeleted;
  }

  async setDuration(studyId: string, { duration }: SetDurationDto) {
    const totalDuration = await this.getTotalStudyDuration(studyId);

    if (totalDuration && totalDuration < duration)
      throw new BadRequestException('duration is too big');

    await this.attributesRepository.set(studyId, 'duration', duration);
  }

  async getDuration(studyId: string) {
    return await this.attributesRepository.get(studyId, 'duration');
  }

  async setStartDate(studyId: string, startDate: Date) {
    const endDate = await this.getEndDate(studyId);

    if (endDate && datetime.isBefore(endDate, startDate))
      throw new BadRequestException('start date must be smaller than end date');

    const duration = await this.getDuration(studyId);

    if (
      duration &&
      endDate &&
      datetime.daysInBetween(new Date(startDate), new Date(endDate)) < duration
    )
      throw new BadRequestException('total duration is to small');

    await this.attributesRepository.set(
      studyId,
      'startDate',
      startDate.toISOString(),
    );
  }

  async getStartDate(studyId: string) {
    const date = await this.attributesRepository.get(studyId, 'startDate');
    if (date === null) return null;
    return new Date(date);
  }

  async setEndDate(studyId: string, endDate: Date) {
    const startDate = await this.getStartDate(studyId);

    if (startDate && datetime.isAfter(startDate, endDate))
      throw new BadRequestException('end date must be greater than start date');

    const duration = await this.getDuration(studyId);

    if (
      duration &&
      startDate &&
      datetime.daysInBetween(new Date(startDate), new Date(endDate)) < duration
    )
      throw new BadRequestException('total duration is to small');

    await this.attributesRepository.set(
      studyId,
      'endDate',
      endDate.toISOString(),
    );
  }

  async getEndDate(studyId: string) {
    const date = await this.attributesRepository.get(studyId, 'endDate');
    if (date === null) return null;
    return new Date(date);
  }

  async hardDelete(studyId: string) {
    return await this.studiesRepository.hardDelete(studyId);
  }

  async softDelete(studyId: string) {
    return await this.studiesRepository.softDelete(studyId);
  }

  async restore(studyId: string) {
    return this.studiesRepository.restore(studyId);
  }

  async getTotalStudyDuration(studyId: string) {
    const startDate = await this.getStartDate(studyId);
    const endDate = await this.getEndDate(studyId);

    if (startDate === null || endDate === null) return null;

    return datetime.daysInBetween(startDate, endDate);
  }

  async isActive(studyId: string) {
    const isActive = await this.attributesRepository.get(studyId, 'isActive');
    if (isActive === null) return false;
    return isActive;
  }

  private generateStatus(
    study: { id: string; name: string; deletedAt: Date; role: string },
    attributes: StudyAttributes,
  ) {
    const { startDate, endDate } = attributes;
    const currentDate = new Date();
    if (study.deletedAt) return 'Deleted';
    if (
      attributes.isActive &&
      startDate &&
      datetime.isBefore(new Date(startDate), currentDate)
    )
      return 'Scheduled';
    if (
      attributes.isActive &&
      endDate &&
      datetime.isAfter(new Date(startDate), currentDate)
    )
      return 'Done';
    if (attributes.isActive) return 'Ongoing';
    if (attributes.isActive) return 'InProgress';
    return 'None';
  }
}
