import { Injectable } from '@nestjs/common';
import { Task } from '@entities';
import { Repository } from 'typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksRepository extends RecordRepository<Task> {
  constructor(
    @InjectRepository(Task)
    db: Repository<Task>,
  ) {
    super(db);
  }

  getRelatedByStudy(studyId: string, id: string): Promise<any> {
    return this.db.findOne({ where: { id, form: { studyId } } });
  }

  async createBatch(tasks: Task[]) {
    await this.db.insert(tasks);
  }

  getAll(participantId: string) {
    return this.db.find({
      where: { participantId },
      order: {
        scheduledAt: 'ASC',
      },
      relations: {
        form: true,
      },
      select: {
        id: true,
        originalScheduledAt: true,
        scheduledAt: true,
        completedAt: true,
        rescheduled: true,
        form: { id: true, name: true },
      },
    });
  }
}
