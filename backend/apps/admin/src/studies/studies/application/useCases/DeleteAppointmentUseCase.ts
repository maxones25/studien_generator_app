import { IStudyAppointmentsRepository } from "../../domain";
import { IDeleteAppointmentUseCase } from "../../domain/useCases/IDeleteAppointmentUseCase";


export class DeleteAppointmentUseCase implements IDeleteAppointmentUseCase {
  constructor(
    private readonly appointmentsRepository: IStudyAppointmentsRepository,
  ) {}

  execute(appointmentId: string): Promise<number> {
    return this.appointmentsRepository.deleteStudyAppointment(appointmentId);
  }
}
