import { Module } from "@nestjs/common";
import { SchedulingService } from "./scheduling.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatMessage, ParticipantNotification, Task } from "@entities";
import { DataService } from "./scheduling-data.service";

@Module({
  imports: [TypeOrmModule.forFeature([ParticipantNotification, ChatMessage, Task])],
  providers: [SchedulingService, DataService],
})
export class SchedulingModule {}