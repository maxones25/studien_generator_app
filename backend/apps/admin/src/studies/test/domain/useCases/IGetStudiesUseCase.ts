import { UseCase } from '@admin/studies/shared/UseCase';
import { Study } from '../models/Study';

export interface IGetStudiesUseCase extends UseCase<void, Promise<Study[]>> {}
