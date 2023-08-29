import { Injectable } from '@nestjs/common';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '@entities';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findByParticipant(participantId: string) {
    const tasks = await this.taskRepository.find({ 
      where: { participantId },
      relations: {
        form: true,
      },
      select: {
        form: {
          name: true
        }
      }
    });
    return tasks.map((task: Task) => {
      return {
        name: task.form.name,
        ...task
      }
    })
  }

  async findOneByIdForParticipant(taskId: string, participantId: string) {
    return await this.taskRepository.findOne({ 
      where: { id: taskId, participantId } 
    });
  }

  async findModifiedSince(participantId: string, lastUpdated: Date) {
    const tasks = await this.taskRepository.find({
      where: {
        modifiedAt: MoreThanOrEqual(lastUpdated),
        participantId: participantId
      },
      select: {
        form: {
          name: true
        }
      }
    });
    return tasks.map((task: Task) => {
      return {
        name: task.form.name,
        ...task
      }
    });
  }
}
