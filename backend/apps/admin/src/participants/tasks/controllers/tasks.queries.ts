import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { ParticipantQueryDto } from '@admin/participants/participants/dtos/ParticipantQueryDto';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { ParticipantGuard } from '@admin/participants/participants/guards/participant.guard';
import { Roles } from '@admin/roles/roles.decorator';

@Controller('participants')
@UseGuards(StudyGuard, ParticipantGuard)
export class TasksQueries {
  constructor(
    @Inject(TasksService)
    private readonly tasksService: TasksService,
  ) {}

  @Get('getTasks')
  @Roles('admin', 'employee')
  getTasks(@Query() { participantId }: ParticipantQueryDto) {
    return this.tasksService.getAll(participantId);
  }
}
