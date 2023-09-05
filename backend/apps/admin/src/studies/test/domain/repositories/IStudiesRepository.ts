import { CreateEntityDto } from '@admin/studies/shared/CreateEntityDto';
import { Study } from '../models/Study';

export type CreateStudyDto = CreateEntityDto<Study>;

export interface IStudiesRepository {
  getStudies(): Promise<Study[]>;
  createStudy(data: CreateStudyDto): Promise<string>;
}
