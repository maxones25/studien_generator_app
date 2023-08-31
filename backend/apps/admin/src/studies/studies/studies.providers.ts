import { StudiesService } from './studies.service';
import { Provider } from '@nestjs/common';
import { StudyGuard } from './guards/study.guard';
import { CreateStudyTransaction } from './transactions/create-study.transaction';
import { StudyAttributesRepository } from './repositories/study-attributes.repository';
import { StudiesRepository } from './repositories/studies.repository';
import { IsStudyActiveGuard } from './guards/IsStudyActiveGuard';
import { IsStudyDeletedGuard } from './guards/IsStudyDeletedGuard';

const studiesProviders: Provider[] = [
  StudyGuard,
  IsStudyDeletedGuard,
  IsStudyActiveGuard,
  StudiesService,
  CreateStudyTransaction,
  StudyAttributesRepository,
  StudiesRepository,
];

export default studiesProviders;
