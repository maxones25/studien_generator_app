import { Body, Controller, Delete, Get, Put, Request } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { DirectorId } from '../../decorators/director-id.decorator';
import { UpdateDirectorDto } from './dtos/UpdateDirectorDto';

@Controller('directors')
export class DirectorsController {
  constructor(private readonly directorsService: DirectorsService) {}

  @Get()
  async findAll() {
    return this.directorsService.findAll();
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
