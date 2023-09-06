import { Appointment } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsRepository } from './appointment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  providers: [AppointmentsRepository],
  exports: [AppointmentsRepository],
})
export class AppointmentsModule {}
