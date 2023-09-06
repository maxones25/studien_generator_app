import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '@entities';
import { AppoinmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  controllers: [AppoinmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
