import { IApp } from '@test/app/createApp';
import { StudyRequestOptions } from '../../../types';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { request } from '@test/app/request';
import fakeData from '@test/fakeData';

export interface CreateFieldOptions extends StudyRequestOptions {
  entityId: string;
  data?: object;
}

export const createField = (
  app: IApp,
  {
    accessToken,
    studyId,
    entityId,
    data = fakeData.entityField(),
  }: CreateFieldOptions,
) =>
  request(app).command({
    path: `/entities/addField`,
    accessToken,
    query: { studyId, entityId },
    data,
  });

export const createFieldId = (
  app: IApp,
  {
    accessToken,
    studyId,
    entityId,
    data = fakeData.entityField(),
  }: CreateFieldOptions,
) =>
  new Promise<string>((resolve, reject) => {
    createField(app, { accessToken, studyId, entityId, data })
      .expect(201)
      .then((res) => {
        const { id } = res.body;
        expect(validateUUID(id)).toBeTruthy();
        resolve(id);
      })
      .catch((err) => reject(err));
  });
