import { Controller, Get, Query, UseGuards, Inject } from '@nestjs/common';
import { Roles } from '@admin/roles/roles.decorator';
import { EntityQueryDto } from '@admin/entities/entities/domain/dtos/EntityQueryDto';
import { FieldsService } from '../services/fields.service';
import { EntityGuard } from '@admin/entities/entities/guards/entity.guard';
import { StudyGuard } from '@admin/studies/studies/guards/study.guard';

@Controller('entities')
@UseGuards(StudyGuard)
export class FieldsQueries {
  constructor(
    @Inject(FieldsService)
    private readonly fieldsService: FieldsService,
  ) {}

  @Get('getFields')
  @Roles('admin', 'employee')
  @UseGuards(EntityGuard)
  async getFields(@Query() { entityId }: EntityQueryDto) {
    return this.fieldsService.getByEntity(entityId);
  }
}
