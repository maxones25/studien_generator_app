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
    private studyAttributesRepository: StudyAttributesRepository,
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
      !(await this.studyAttributesRepository.isSet(
        studyId,
        StudyAttribute.StartDate,
      ))
    )
      throw new BadRequestException('startDate must be set');
    if (
      !(await this.studyAttributesRepository.isSet(
        studyId,
        StudyAttribute.EndDate,
      ))
    )
      throw new BadRequestException('endDate must be set');
    if (
      !(await this.studyAttributesRepository.isSet(
        studyId,
        StudyAttribute.Duration,
      ))
    )
      throw new BadRequestException('duration must be set');

    this.studyAttributesRepository.set(studyId, StudyAttribute.IsActive, true);
  }

  async deactivate(studyId: string) {
    this.studyAttributesRepository.set(studyId, StudyAttribute.IsActive, false);
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
    const attributes = await this.studyAttributesRepository.getAll(studyId);

    return {
      ...study,
      ...attributes,
    };
  }

  async setDuration(studyId: string, { duration }: SetDurationDto) {
    const totalDuration = await this.getTotalStudyDuration(studyId);

    if (totalDuration && totalDuration < duration)
      throw new BadRequestException('duration is too big');

    await this.studyAttributesRepository.set(
      studyId,
      StudyAttribute.Duration,
      duration,
    );
  }

  async setStartDate(studyId: string, startDate: string) {
    const endDate = await this.studyAttributesRepository.get(
      studyId,
      StudyAttribute.EndDate,
    );

    if (endDate && datetime.isBefore(new Date(endDate), new Date(startDate)))
      throw new BadRequestException('start date must be smaller than end date');

    const duration = await this.studyAttributesRepository.get(
      studyId,
      StudyAttribute.Duration,
    );

    if (
      duration &&
      endDate &&
      datetime.daysInBetween(new Date(startDate), new Date(endDate)) < duration
    )
      throw new BadRequestException('total duration is to small');

    await this.studyAttributesRepository.set(
      studyId,
      StudyAttribute.StartDate,
      startDate,
    );
  }

  async setEndDate(studyId: string, endDate: string) {
    const startDate = await this.studyAttributesRepository.get(
      studyId,
      StudyAttribute.StartDate,
    );

    if (startDate && datetime.isAfter(new Date(startDate), new Date(endDate)))
      throw new BadRequestException('end date must be greater than start date');

    const duration = await this.studyAttributesRepository.get(
      studyId,
      StudyAttribute.Duration,
    );

    if (
      duration &&
      startDate &&
      datetime.daysInBetween(new Date(startDate), new Date(endDate)) < duration
    )
      throw new BadRequestException('total duration is to small');

    await this.studyAttributesRepository.set(
      studyId,
      StudyAttribute.EndDate,
      endDate,
    );
  }

  async start(studyId: string) {
    const date = datetime.isoDate();

    await this.studyAttributesRepository.insert({
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
    const startDate = await this.studyAttributesRepository.get(
      studyId,
      StudyAttribute.StartDate,
    );

    const endDate = await this.studyAttributesRepository.get(
      studyId,
      StudyAttribute.EndDate,
    );

    if (startDate === null) return null;
    if (endDate === null) return null;

    return datetime.daysInBetween(new Date(startDate), new Date(endDate));
  }
}
