import { Controller, Inject, Query, Get } from '@nestjs/common';
import { GetStudiesUseCase } from '../../app/GetStudiesUseCase';
import { IGetStudiesUseCase } from '../../domain/useCases/IGetStudiesUseCase';

@Controller('test')
export class TestQueries {
  constructor(
    @Inject(GetStudiesUseCase)
    private readonly _getStudies: IGetStudiesUseCase,
  ) {}

  @Get('studies')
  getStudies() {
    return this._getStudies.execute();
  }
}
