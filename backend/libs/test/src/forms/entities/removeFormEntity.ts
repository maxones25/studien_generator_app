import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface RemoveFormEntityOptions extends StudyRequestOptions {
  formEntityId: any;
}

export const removeFormEntity = (
  app: IApp,
  { accessToken, studyId, formEntityId }: RemoveFormEntityOptions,
) =>
  request(app).command({
    path: '/forms/removeEntity',
    accessToken,
    query: { studyId, entityId: formEntityId },
  });
