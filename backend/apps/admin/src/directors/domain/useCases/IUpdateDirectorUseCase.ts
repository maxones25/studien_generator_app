import { Director } from '@entities/core/director';
import { UpdateDto } from '@entities/modules/core/UpdateDto';
import { UseCase } from '@shared/modules/core';

export const UPDATE_DIRECTOR_USE_CASE = 'UPDATE_DIRECTOR_USE_CASE';

export type UpdateDirectorInput = {
  directorId: string;
  data: UpdateDirectorDto;
};

export type UpdateDirectorDto = Omit<UpdateDto<Director>, "password">

export interface IUpdateDirectorUseCase
  extends UseCase<UpdateDirectorInput, Promise<number>> {}
