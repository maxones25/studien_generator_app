import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface ChangeFormEntityNameOptions extends StudyRequestOptions {
  formEntityId: any;
  name: any;
}

export const changeFormEntityName = (
  app: IApp,
  { accessToken, studyId, formEntityId, name }: ChangeFormEntityNameOptions,
) =>
  request(app).command({
    path: '/forms/changeEntityName',
    accessToken,
    query: { studyId, entityId: formEntityId },
    data: { name },
  });
