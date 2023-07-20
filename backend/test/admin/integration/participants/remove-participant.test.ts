import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/admin.module';
import fakeData from '../../fakeData';
import {
  createApp,
  createDirector,
  createGroup,
  createParticipant,
  createStudy,
  getDirectorAccessToken,
} from '../../utils';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let directorId: any;
  let accessToken: string;
  let studyId: string;
  let groupId: string;

  beforeAll(async () => {
    app = await createApp(AppModule)

    const director = fakeData.director();
    const study = fakeData.study();
    const group = fakeData.group();

    directorId = await createDirector(app, {
      ...director,
      activationPassword: process.env.ACTIVATION_PASSWORD,
    });

    accessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    studyId = await createStudy(app, accessToken, study);
    groupId = await createGroup(app, accessToken, studyId, group);
  });

  it('/DELETE remove participant from group successfully', async () => {
    const participant = fakeData.participant();
    const participantId = await createParticipant(
      app,
      accessToken,
      studyId,
      {
        number: participant.number,
        groupId,
      }
    );
    return request(app.getHttpServer())
      .delete(
        `/studies/${studyId}/participants/${participantId}`,
      )
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
