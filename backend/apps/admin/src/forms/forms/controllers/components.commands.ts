import {
  Controller,
  Post,
  Body,
  Query,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { CreateFormComponentDto } from '../dtos/CreateFormComponentDto';
import { Roles } from '@admin/roles/roles.decorator';
import { ComponentsService } from '../services/components.service';
import { ComponentQueryDto } from '../dtos/ComponentQueryDto';
import { PageQueryDto } from '../dtos/PageQueryDto';
import { PageGuard } from '../guards/page.guard';
import { ComponentGuard } from '../guards/component.guard';
import { ComponentsService as UiComponentsService } from '@admin/components/components.service';

@Controller('forms')
export class ComponentsCommands {
  constructor(
    @Inject(ComponentsService)
    private readonly componentsService: ComponentsService,
    @Inject(UiComponentsService)
    private readonly uiComponentsService: UiComponentsService,
  ) {}

  @Post('addComponent')
  async create(
    @Query() { pageId }: PageQueryDto,
    @Body() body: CreateFormComponentDto,
  ) {
    const { formFields, type, attributes } = body;
    const entityFieldsIds = formFields.map(({ fieldId }) => fieldId);

    await this.uiComponentsService.validateFormComponent(
      type,
      entityFieldsIds,
      Object.keys(attributes).map((key) => ({
        key,
        value: attributes[key],
      })),
    );

    return this.componentsService.add(pageId, body);
  }

  @Post('removeComponent')
  @Roles('admin')
  @UseGuards(PageGuard, ComponentGuard)
  async delete(
    @Query() { pageId }: PageQueryDto,
    @Query() { componentId }: ComponentQueryDto,
  ) {
    return this.componentsService.remove(pageId, componentId);
  }
}
