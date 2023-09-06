import { UseCase } from "@shared/modules/core/UseCase";

export interface IDeleteAppointmentUseCase extends UseCase<string, Promise<number>> {}