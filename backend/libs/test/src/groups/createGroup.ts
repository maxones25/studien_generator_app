import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import fakeData from '@test/fakeData';
import { StudyRequestOptions } from '@test/types';

export interface CreateGroupOptions extends StudyRequestOptions {
  data?: any;
}

export const createGroup = (
  app: IApp,
  { accessToken, studyId, data = fakeData.group() }: CreateGroupOptions,
) => request(app).command({ path: "/groups/create", accessToken, query: { studyId }, data })
export const createGroupId = (
  app: IApp,
  { accessToken, studyId, data }: CreateGroupOptions,
) =>
  new Promise<string>((resolve, reject) => {
    createGroup(app, { accessToken, studyId, data })
      .expect(201)
      .then((res) => {
        expect(validateUUID(res.text)).toBeTruthy();
        resolve(res.text);
      })
      .catch((err) => reject(err));
  });
