import { Injectable } from '@nestjs/common';
import { Task } from '@entities';
import { Repository } from 'typeorm';

@Injectable()
export class TasksRepository extends Repository<Task> {}
