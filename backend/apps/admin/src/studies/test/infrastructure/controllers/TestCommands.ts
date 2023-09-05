import { Post, Controller, Inject, Body } from '@nestjs/common';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { CreateStudyDto } from '@admin/studies/studies/dtos/CreateStudyDto';
import { DirectorId } from '@admin/directors/decorators/director-id.decorator';
import { CreateStudyUseCase } from '../../app/CreateStudyInteractor';

@Controller('test')
export class TestCommands {
  constructor(
    @Inject(CreateStudyUseCase)
    private readonly createStudy: CreateStudyUseCase,
  ) {}

  @Post('createStudy')
  createS(@DirectorId() directorId: string, @Body() { name }: CreateStudyDto) {
    return this.createStudy.execute({ directorId, name });
  }
}
