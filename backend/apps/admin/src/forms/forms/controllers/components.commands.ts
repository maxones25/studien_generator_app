import {
  Controller,
  Post,
  Body,
  Query,
  Inject,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateFormComponentDto } from '../dtos/CreateFormComponentDto';
import { Roles } from '@admin/members/infrastructure/http';
import { ComponentsService } from '../services/components.service';
import { ComponentQueryDto } from '../dtos/ComponentQueryDto';
import { PageQueryDto } from '../dtos/PageQueryDto';
import { PageGuard } from '../guards/page.guard';
import { ComponentGuard } from '../guards/component.guard';
import { ComponentsService as UiComponentsService } from '@admin/components/components.service';
import { StudyGuard } from '@admin/studies/studies/infrastructure/http/guards/study.guard';
import { IsStudyDeletedGuard } from '@admin/studies/studies/infrastructure/http';

@Controller('forms')
@UseGuards(StudyGuard, IsStudyDeletedGuard)
export class ComponentsCommands {
  constructor(
    @Inject(ComponentsService)
    private readonly componentsService: ComponentsService,
    @Inject(UiComponentsService)
    private readonly uiComponentsService: UiComponentsService,
  ) {}

  @Post('addComponent')
  @UseGuards(PageGuard)
  @Roles('admin', 'employee')
  async create(
    @Query() { pageId }: PageQueryDto,
    @Body() body: CreateFormComponentDto,
  ) {
    const { formFields, type, attributes } = body;

    await this.uiComponentsService.validateFormComponent(
      type,
      formFields,
      Object.keys(attributes).map((key) => ({
        key,
        value: attributes[key],
      })),
    );

    return this.componentsService.add(pageId, body);
  }

  @Post('removeComponent')
  @HttpCode(HttpStatus.OK)
  @Roles('admin')
  @UseGuards(PageGuard, ComponentGuard)
  async delete(
    @Query() { pageId }: PageQueryDto,
    @Query() { componentId }: ComponentQueryDto,
  ) {
    return this.componentsService.remove(pageId, componentId);
  }
}
