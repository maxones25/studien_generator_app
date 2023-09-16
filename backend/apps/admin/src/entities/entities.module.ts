import { Module } from '@nestjs/common';
import { EntitiesDb } from '@admin/entities/infrastructure/db';
import * as Provider from './providers';
import * as Guard from './infrastructure/http';
import * as Domain from '@admin/entities/domain';
import { EntitiesService } from './application';

@Module({
  imports: [EntitiesDb],
  providers: [
    EntitiesService,
    Provider.EntitiesRepositoryProvider,
    Provider.CreateEntityUseCaseProvider,
    Provider.ChangeEntityNameUseCaseProvider,
    Provider.GetStudyRelatedEntityUseCaseProvider,
    Provider.DeleteEntityUseCaseProvider,
    Provider.GetAllEntitiesUseCaseProvider,
    Provider.GetEntityByIdUseCaseProvider,
    Guard.EntityGuard,
  ],
  exports: [
    EntitiesService,
    Domain.CREATE_ENTITY_USE_CASE,
    Domain.GET_STUDY_RELATED_ENTITY_USE_CASE,
    Domain.CHANGE_ENTITY_NAME_USE_CASE,
    Domain.DELETE_ENTITY_USE_CASE,
    Domain.GET_ALL_ENTITIES_USE_CASE,
    Domain.GET_ENTITY_BY_ID_USE_CASE,
    Guard.EntityGuard,
  ],
})
export class EntitiesModule {}
