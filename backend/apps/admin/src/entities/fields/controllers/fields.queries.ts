import { Controller, Get, Query, UseGuards, Inject } from '@nestjs/common';
import { Roles } from '@admin/roles/roles.decorator';
import { EntityQueryDto } from '@admin/entities/entities/dtos/EntityQueryDto';
import { FieldsService } from '../fields.service';
import { EntityGuard } from '@admin/entities/entities/entity.guard';

@Controller('entities')
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
