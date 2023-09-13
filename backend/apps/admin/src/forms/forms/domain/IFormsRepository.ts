import { CreateFormDto } from '../dtos/CreateFormDto';

export interface IFormsRepository {
  createForm(studyId: string, data: CreateFormDto): Promise<string>;
}
