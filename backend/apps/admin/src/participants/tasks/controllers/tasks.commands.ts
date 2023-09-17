import {
  Controller,
  Inject,
  Post,
  Query,
  UseGuards,
  Body,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { ParticipantQueryDto } from '@admin/participants/participants/dtos/ParticipantQueryDto';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { UpdateTaskDto } from '../dtos/UpdateTaskDto';
import { TaskGuard } from '../task.guard';
import { Roles } from '@admin/members/infrastructure/http';
import { TaskQueryDto } from '../dtos/TaskQueryDto';
import { ParticipantGuard } from '@admin/participants/participants/guards/participant.guard';
import { CreateTaskDto } from '../dtos/CreateTaskDto';
import { FormQueryDto } from '@admin/forms/forms/dtos/FormQueryDto';
import { FormGuard } from '@admin/forms/forms/guards/form.guard';
import { IsStudyDeletedGuard } from '@admin/studies/studies/guards/IsStudyDeletedGuard';

@Controller('participants')
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class TasksCommands {
  constructor(
    @Inject(TasksService)
    private readonly tasksService: TasksService,
  ) {}

  @Post('createTask')
  @Roles('admin', 'employee')
  @UseGuards(FormGuard, ParticipantGuard)
  createTask(
    @Query() { formId }: FormQueryDto,
    @Query() { participantId }: ParticipantQueryDto,
    @Body() body: CreateTaskDto,
  ) {
    return this.tasksService.create(participantId, formId, body);
  }

  @Post('updateTask')
  @Roles('admin', 'employee')
  @UseGuards(TaskGuard)
  updateTask(@Query() { taskId }: TaskQueryDto, @Body() body: UpdateTaskDto) {
    return this.tasksService.update(taskId, body);
  }
}
