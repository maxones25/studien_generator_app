import { Transactional } from '@shared/modules/core/Transactional';
import {
  CreateFormInput,
  ICreateFormUseCase,
} from '../domain/ICreateFormUseCase';
import { IFormsRepository } from '../domain/IFormsRepository';
import { Inject } from '@shared/modules/core/Inject';
import { IPagesRepository } from '../domain/IPagesRepository';

export class CreateFormUseCase implements ICreateFormUseCase {
  constructor(
    @Inject('IFormsRepository')
    private readonly formsRepository: IFormsRepository,
    @Inject('IPagesRepository')
    private readonly pagesRepository: IPagesRepository,
  ) {}

  @Transactional()
  async execute({ studyId, data }: CreateFormInput): Promise<string> {
    const formId = await this.formsRepository.createForm(studyId, data);

    const number = 1;
    
    await this.pagesRepository.addPage(formId, number)

    return formId;
  }
}
