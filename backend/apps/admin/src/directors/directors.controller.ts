import { Body, Controller, Delete, Get, Put } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { UpdateDirectorDto } from './dtos/UpdateDirectorDto';
import { DirectorId } from '@admin/directors/director-id.decorator';

@Controller('directors')
export class DirectorsController {
  constructor(private readonly directorsService: DirectorsService) {}

  @Get()
  async getAll() {
    return this.directorsService.getAll();
  }

  @Delete()
  async delete(@DirectorId() directorId: string) {
    return this.directorsService.delete(directorId);
  }

  @Put()
  async update(
    @DirectorId() directorId: string,
    @Body() body: UpdateDirectorDto,
  ) {
    return this.directorsService.update(directorId, body);
  }
}
