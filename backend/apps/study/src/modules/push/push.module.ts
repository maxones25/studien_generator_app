import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushService } from './push.service';
import { PushController } from './push.controller';
import { Participant } from '@entities';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  controllers: [PushController],
  providers: [PushService],
})
export class PushModule {}
