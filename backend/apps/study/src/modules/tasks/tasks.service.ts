import { Injectable } from '@nestjs/common';
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '@entities';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findByParticipant(participantId: string): Promise<Task[]> {
    return await this.taskRepository.find({ where: { participantId } });
  }

  async findOneByIdForParticipant(taskId: string, participantId: string): Promise<Task | undefined> {
    return await this.taskRepository.findOne({ where: { id: taskId, participantId } });
  }

  async findModifiedSince(participantId: string, lastUpdate: Date): Promise<Task[]> {
    return await this.taskRepository.find({
      where: {
        modifiedAt: MoreThan(lastUpdate),
        participantId: participantId
      }
    });
  }
}
