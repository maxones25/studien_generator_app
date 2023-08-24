import {
  Body,
  Controller,
  Post,
  Query,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@admin/roles/roles.decorator';
import { FormQueryDto } from '../dtos/FormQueryDto';
import { ChangeNameDto } from '../dtos/ChangeNameDto';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';
import { FormGuard } from '../guards/form.guard';
import { EntitiesService } from '../services/entities.service';
import { CreateEntityDto } from '../dtos/CreateEntityDto';
import { EntityQueryDto } from '@admin/entities/entities/dtos/EntityQueryDto';
import { EntityQueryDto as FormEntityQueryDto } from '../dtos/EntityQueryDto';
import { EntityGuard } from '@admin/entities/entities/entity.guard';
import { EntityGuard as FormEntityGuard } from '../guards/entity.guard';

@Controller('forms')
@UseGuards(StudyGuard)
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
    return this.entitiesService.add(formId, entityId, name);
  }

  @Post('changeEntityName')
  @Roles('admin', 'employee')
  @UseGuards(FormEntityGuard)
  async changeName(
    @Query() { entityId }: FormEntityQueryDto,
    @Body() { name }: ChangeNameDto,
  ) {
    return this.entitiesService.changeName(entityId, name);
  }

  @Post('removeEntity')
  @Roles('admin')
  @UseGuards(FormEntityGuard)
  async delete(@Query() { entityId }: FormEntityQueryDto) {
    return this.entitiesService.remove(entityId);
  }
}
