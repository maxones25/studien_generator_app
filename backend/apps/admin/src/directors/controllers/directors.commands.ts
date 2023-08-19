import { Body, Controller, Post } from '@nestjs/common';
import { DirectorsService } from '../directors.service';
import { UpdateDirectorDto } from '../dtos/UpdateDirectorDto';
import { DirectorId } from '@admin/directors/director-id.decorator';

@Controller('directors')
export class DirectorsCommands {
  constructor(private readonly directorsService: DirectorsService) {}

  @Post('delete')
  async delete(@DirectorId() directorId: string) {
    return this.directorsService.delete(directorId);
  }

  @Post('update')
  async update(
    @DirectorId() directorId: string,
    @Body() body: UpdateDirectorDto,
  ) {
    return this.directorsService.update(directorId, body);
  }
}
