import { Module } from '@nestjs/common';
import { ParticipantsApp as RootParticipantsApp } from './participants/participants.app';
import { TasksApp } from './tasks/tasks.app';

@Module({ imports: [RootParticipantsApp, TasksApp] })
export class ParticipantsApp {}
