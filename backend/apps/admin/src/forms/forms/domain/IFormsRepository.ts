import { Form } from '@entities/core/form';
import { CreateFormDto } from '../dtos/CreateFormDto';
import { Id } from '@shared/modules/core';

export const FORMS_REPOSITORY = "FORMS_REPOSITORY";

export interface IFormsRepository {
  createForm(studyId: Id, data: CreateFormDto): Promise<string>;
  getAvailableForms(studyId: Id, groupId: Id): Promise<Form[]>;
}
