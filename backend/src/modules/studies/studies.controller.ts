import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StudiesService } from './studies.service';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateStudyDto } from './dtos/createStudyDto';
import { DeleteStudyDto } from './dtos/deleteStudyDto';
import { AddOrRemoveDirector } from './dtos/addOrRemoveDirector';
import { TransferAdminDto } from './dtos/transferAdminDto';

@Controller('studies')
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Roles('director')
  @Get('all')
  async findAll() {
    return this.studiesService.findAll();
  }

  @Roles('director')
  @Post('create')
  async create(@Body()createStudyDto: CreateStudyDto) {
    return this.studiesService.create(createStudyDto);
  }

  @Roles('director')
  @Post('delete')
  async delete(@Body()deleteStudyDto: DeleteStudyDto) {
    return this.studiesService.delete(deleteStudyDto);
  }

  @Roles('director')
  @Post('employee/add')
  async addEmployee(@Body()addOrRemoveDirector: AddOrRemoveDirector) {
    return this.studiesService.addEmployee(addOrRemoveDirector);
  }

  @Roles('director')
  @Post('employee/remove')
  async deleteDirector(@Body()addOrRemoveDirector: AddOrRemoveDirector) {
    return this.studiesService.removeEmployee(addOrRemoveDirector);
  }

  @Roles('director')
  @Post('transfer')
  async transferAdmin(@Body()transferAdminDto: TransferAdminDto) {
    return this.studiesService.transferAdmin(transferAdminDto);
  }
}
