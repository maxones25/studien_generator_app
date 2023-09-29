import {
  Body,
  Controller,
  Post,
  Query,
  Inject,
  UseGuards,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Roles } from '@admin/members/infrastructure/http';
import { FormQueryDto } from '../dtos/FormQueryDto';
import { ChangeNameDto } from '../dtos/ChangeNameDto';
import { StudyGuard } from '@admin/studies/studies/infrastructure/http/guards/study.guard';
import { FormGuard } from '../guards/form.guard';
import { EntitiesService } from '../services/entities.service';
import { CreateEntityDto } from '../dtos/CreateEntityDto';
import { EntityQueryDto } from '@admin/entities/infrastructure/http/dtos/EntityQueryDto';
import { EntityQueryDto as FormEntityQueryDto } from '../dtos/EntityQueryDto';
import { EntityGuard } from '@admin/entities/infrastructure/http/guards/entity.guard';
import { EntityGuard as FormEntityGuard } from '../guards/entity.guard';
import { Entity } from '../decorators/entity.decorator';
import { FormEntity } from '@entities';
import { IsStudyDeletedGuard } from '@admin/studies/studies/infrastructure/http';

@Controller('forms')
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class EntitiesCommands {
  constructor(
    @Inject(EntitiesService)
    private readonly entitiesService: EntitiesService,
  ) {}

  @Post('addEntity')
  @Roles('admin', 'employee')
  @UseGuards(FormGuard, EntityGuard)
  async create(
    @Query() { formId }: FormQueryDto,
    @Query() { entityId }: EntityQueryDto,
    @Body() { name }: CreateEntityDto,
  ) {
    let isEqual = true;

    do {
      const entity = await this.entitiesService.getByFormAndName(formId, name);

      isEqual = Boolean(entity);

      if (isEqual) {
        name = name + ' 2';
      }
    } while (isEqual);

    return this.entitiesService.add(formId, entityId, name);
  }

  @Post('changeEntityName')
  @HttpCode(HttpStatus.OK)
  @Roles('admin', 'employee')
  @UseGuards(FormEntityGuard)
  async changeName(
    @Entity() entity: FormEntity,
    @Body() { name }: ChangeNameDto,
  ) {
    const sameNameEntity = await this.entitiesService.getByFormAndName(
      entity.formId,
      name,
    );

    if (Boolean(sameNameEntity))
      throw new BadRequestException('name already exists');

    return this.entitiesService.changeName(entity.id, name);
  }

  @Post('removeEntity')
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  @UseGuards(FormEntityGuard)
  async delete(@Query() { entityId }: FormEntityQueryDto) {
    return this.entitiesService.remove(entityId);
  }
}
