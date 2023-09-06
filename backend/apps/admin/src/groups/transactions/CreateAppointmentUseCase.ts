import { ICreateAppointmentUseCase } from '../domain/ICreateAppointmentUseCase';
import { IGroupAppointmentRepository } from '../domain/IGroupAppointmentRepository';

export class CreateAppointmentUseCase implements ICreateAppointmentUseCase {
  constructor(
    private readonly appointmentsRepository: IGroupAppointmentRepository,
  ) {}

  execute({ data, groupId }) {
    return this.appointmentsRepository.createGroupAppointment(groupId, data);
  }
}
