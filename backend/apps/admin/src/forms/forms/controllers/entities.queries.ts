import {
  Body,
  Controller,
  Get,
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
export class EntitiesQueries {
  constructor(
    @Inject(EntitiesService)
    private readonly entitiesService: EntitiesService,
  ) {}

  @Get('getEntities')
  @Roles('admin', 'employee')
  @UseGuards(FormGuard)
  async getEntities(@Query() { formId }: FormQueryDto) {
    return this.entitiesService.getByForm(formId);
  }
}
