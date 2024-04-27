import { UseCase } from "@shared/modules/core/UseCase";

export type CreateStudyAppointmentInput = {
  appointmentId: string;
};

export interface IDeleteAppointmentUseCase extends UseCase<string, Promise<number>> {}