import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { DirectorsService } from '../directors.service';
import { DirectorId } from '../decorators/director-id.decorator';
import { IsDirectorDeletedGuard } from '../guards/IsDirectorDeletedGuard';

@Controller('directors')
export class DirectorsQueries {
  constructor(
    @Inject(DirectorsService)
    private readonly directorsService: DirectorsService,
  ) {}

  @Get('me')
  @UseGuards(IsDirectorDeletedGuard)
  async me(@DirectorId() directorId: string) {
    return this.directorsService.getById(directorId);
  }

  @Get('getAll')
  async getAll() {
    return this.directorsService.get();
  }
}
