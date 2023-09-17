import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import fakeData from '@test/fakeData';
import { StudyRequestOptions } from '@test/types';

export interface CreateTaskOptions extends StudyRequestOptions {
  participantId: any;
  formId: any;
  data?: any;
}

export const createTask = (
  app: IApp,
  {
    accessToken,
    studyId,
    participantId,
    formId,
    data = fakeData.task(),
  }: CreateTaskOptions,
) =>
  request(app).command({
    path: '/participants/createTask',
    accessToken,
    query: { studyId, participantId, formId },
    data,
  });

export const createTaskId = (app: IApp, options: CreateTaskOptions) =>
  new Promise<string>((resolve, reject) => {
    createTask(app, options)
      .expect(201)

      .then((res) => {
        expect(validateUUID(res.text)).toBeTruthy();
        resolve(res.text);
      })
      .catch((err) => reject(err));
  });
