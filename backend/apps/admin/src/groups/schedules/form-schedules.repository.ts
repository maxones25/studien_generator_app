import { FormSchedule } from '@entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class FormSchedulesRepository extends Repository<FormSchedule> {}
