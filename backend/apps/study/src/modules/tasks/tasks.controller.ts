import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { ParticipantId } from '@study/decorators/participant-id.decorator';
import { RescheduleTaskDto } from './dtos/RescheduleTaskDto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(
    @ParticipantId() participantId: string,
    @Query('taskId') taskId?: string,
    @Query('lastupdated') lastUpdated?: string
  ) {
    if (lastUpdated) {
      return await this.taskService.findModifiedSince(participantId, new Date(lastUpdated));
    }
    if (taskId) {
      return await this.taskService.findOneByIdForParticipant(taskId, participantId);
    }
    return await this.taskService.findByParticipant(participantId);
  }

  @Put() 
  async rescheduleTask(
    @Body() {id, date}: RescheduleTaskDto,
  ) {
    return await this.taskService.rescheduleTask(id, date);
  }
}