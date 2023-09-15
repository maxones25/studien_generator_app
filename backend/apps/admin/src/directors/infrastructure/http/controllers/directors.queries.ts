import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { DirectorsService } from '../../../application/services/directors.service';
import { DirectorId } from '../decorators/director-id.decorator';
import { IsAdminGuard } from '../guards/IsAdminGuard';
import { DIRECTORS_SERVICE } from '@admin/directors/domain';

@Controller('directors')
export class DirectorsQueries {
  constructor(
    @Inject(DIRECTORS_SERVICE)
    private readonly directorsService: DirectorsService,
  ) {}

  @Get('me')
  async me(@DirectorId() directorId: string) {
    return this.directorsService.getById(directorId);
  }

  @Get('getAll')
  @UseGuards(IsAdminGuard)
  async getAll() {
    return this.directorsService.get();
  }
}
