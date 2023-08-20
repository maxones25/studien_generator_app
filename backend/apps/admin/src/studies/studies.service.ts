import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CreateStudyDto } from './dtos/CreateStudyDto';
import { CreateStudyTransaction } from './transactions/create-study.transaction';
import { StudyAttributesRepository } from './repositories/study-attributes.repository';
import { StudyAttribute } from './StudyAttribute';
import datetime from '@shared/modules/datetime/datetime';
import { SetDurationDto } from './dtos/SetDurationDto';
import { StudiesRepository } from './repositories/studies.repository';

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
    if (
      !(await this.attributesRepository.isSet(
        studyId,
        StudyAttribute.StartDate,
      ))
    )
      throw new BadRequestException('startDate must be set');
    if (
      !(await this.attributesRepository.isSet(studyId, StudyAttribute.EndDate))
    )
      throw new BadRequestException('endDate must be set');
    if (
      !(await this.attributesRepository.isSet(studyId, StudyAttribute.Duration))
    )
      throw new BadRequestException('duration must be set');

    this.attributesRepository.set(studyId, StudyAttribute.IsActive, true);
  }

  async deactivate(studyId: string) {
    this.attributesRepository.set(studyId, StudyAttribute.IsActive, false);
  }

  async changeName(id: string, name: string) {
    const { affected } = await this.studiesRepository.update(id, { name });
    return affected;
  }

  async getByDirector(directorId: string) {
    return await this.studiesRepository.getByDirector(directorId);
  }

  async getById(studyId: string, directorId: string) {
    const study = await this.studiesRepository.getOneByDirector(
      studyId,
      directorId,
    );
    const attributes = await this.attributesRepository.getAll(studyId);

    return {
      ...study,
      ...attributes,
    };
  }

  async setDuration(studyId: string, { duration }: SetDurationDto) {
    const totalDuration = await this.getTotalStudyDuration(studyId);

    if (totalDuration && totalDuration < duration)
      throw new BadRequestException('duration is too big');

    await this.attributesRepository.set(
      studyId,
      StudyAttribute.Duration,
      duration,
    );
  }

  async getDuration(studyId: string) {
    return await this.attributesRepository.get<number>(
      studyId,
      StudyAttribute.Duration,
    );
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
      StudyAttribute.StartDate,
      startDate,
    );
  }

  async getStartDate(studyId: string) {
    const date = await this.attributesRepository.get<string>(
      studyId,
      StudyAttribute.StartDate,
    );
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
      StudyAttribute.EndDate,
      endDate,
    );
  }

  async getEndDate(studyId: string) {
    const date = await this.attributesRepository.get<string>(
      studyId,
      StudyAttribute.EndDate,
    );
    if (date === null) return null;
    return new Date(date);
  }

  async start(studyId: string) {
    const date = datetime.isoDate();

    await this.attributesRepository.insert({
      studyId,
      key: StudyAttribute.StartDate,
      value: JSON.stringify(date) as any,
    });

    return date;
  }

  async delete(studyId: string) {
    const { affected } = await this.studiesRepository.delete(studyId);
    return affected;
  }

  async getTotalStudyDuration(studyId: string) {
    const startDate = await this.getStartDate(studyId);
    const endDate = await this.getEndDate(studyId);

    if (startDate === null || endDate === null) return null;

    return datetime.daysInBetween(startDate, endDate);
  }

  async isActive(studyId: string) {
    const isActive = await this.attributesRepository.get<boolean>(
      studyId,
      StudyAttribute.IsActive,
    );
    if (isActive === null) return false;
    return isActive;
  }
}
