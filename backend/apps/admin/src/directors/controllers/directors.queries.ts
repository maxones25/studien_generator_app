import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { DirectorsService } from '../directors.service';
import { DirectorId } from '../decorators/director-id.decorator';
import { AdminGuard } from '../guards/AdminGuard';

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
  @UseGuards(AdminGuard)
  async getAll() {
    return this.directorsService.get();
  }
}
