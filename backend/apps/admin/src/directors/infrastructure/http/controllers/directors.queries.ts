import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { DirectorsService } from '@admin/directors/application';
import { DirectorId } from '../decorators/director-id.decorator';
import { IsAdminGuard } from '../guards/IsAdminGuard';
import {
  DIRECTORS_SERVICE,
  GET_DIRECTORS_USE_CASE,
  GET_DIRECTOR_BY_ID_USE_CASE,
  IGetDirectorByIdUseCase,
  IGetDirectorsUseCase,
} from '@admin/directors/domain';

@Controller('directors')
export class DirectorsQueries {
  constructor(
    @Inject(DIRECTORS_SERVICE)
    private readonly directorsService: DirectorsService,
    @Inject(GET_DIRECTORS_USE_CASE)
    private readonly getDirectorsUseCase: IGetDirectorsUseCase,
    @Inject(GET_DIRECTOR_BY_ID_USE_CASE)
    private readonly getDirectorByIdUseCase: IGetDirectorByIdUseCase,
  ) {}

  @Get('me')
  async me(@DirectorId() directorId: string) {
    return this.getDirectorByIdUseCase.execute({ directorId });
  }

  @Get('getAll')
  @UseGuards(IsAdminGuard)
  async getAll() {
    return this.getDirectorsUseCase.execute();
  }
}
