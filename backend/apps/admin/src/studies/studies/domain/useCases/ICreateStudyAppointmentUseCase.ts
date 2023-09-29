import { Id, UseCase } from '@shared/modules/core';
import { CreateDto } from '@entities/modules/core';
import { StudyAppointment } from '@entities/core/appointment';

export type CreateStudyAppointmentInput = {
  studyId: Id;
  data: Omit<
    CreateDto<StudyAppointment>,
    'studyId' | 'groupId' | 'participantId'
  >;
};

export interface ICreateStudyAppointmentUseCase
  extends UseCase<CreateStudyAppointmentInput, Promise<Id>> {}
