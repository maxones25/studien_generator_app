import { Controller, Get, Inject } from '@nestjs/common';
import { DirectorsService } from '../directors.service';
import { DirectorId } from '../decorators/director-id.decorator';

@Controller('directors')
export class DirectorsQueries {
  constructor(
    @Inject(DirectorsService)
    private readonly directorsService: DirectorsService,
  ) {}

  @Get('me')
  async me(@DirectorId() directorId: string) {
    return this.directorsService.getById(directorId);
  }

  @Get('getAll')
  async getAll() {
    return this.directorsService.get();
  }
}
