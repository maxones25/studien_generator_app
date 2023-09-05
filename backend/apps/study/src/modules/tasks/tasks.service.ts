import { ConflictException, Injectable } from '@nestjs/common';
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
        schedule: true
      },
      select: {
        form: {
          name: true
        },
        schedule: {
          id: true,
          postpone: {
            times: true,
            duration: true,
          },
          restrict: {
            before: true,
            after: true,
          }
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
      relations: {
        form: true,
        schedule: true,
      },
      select: {
        form: {
          name: true
        },
        schedule: {
          postpone: {
            times: true,
            duration: true,
          },
          restrict: {
            before: true,
            after: true,
          }
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

  async rescheduleTask(id: string, date: Date) {
    const task = await this.taskRepository.findOne({ 
      where: { id },
      relations: {         
        schedule: true,
      },
      select: { 
        schedule: {
          postpone: {
            times: true,
            duration: true,
          },
        }
      }
    });

    if (!task.schedule.postpone) 
      throw new ConflictException('task cannot be rescheduled');

    if (task.rescheduled < task.schedule.postpone.times) {
      return await this.taskRepository.update(id, {
        scheduledAt: date,
        rescheduled: task.rescheduled + 1
      });
    }
    throw new ConflictException('task cannot be rescheduled again');
  }
}
