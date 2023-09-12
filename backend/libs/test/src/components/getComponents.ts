import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export const getComponents = (app: INestApplication, accessToken: any) => {
  const action = request(app.getHttpServer()).get(`/components`);

  if (accessToken !== undefined) {
    action.set('Authorization', `Bearer ${accessToken}`);
  }

  return action;
};
