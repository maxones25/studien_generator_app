// import { INestApplication } from '@nestjs/common';
// import fakeData from '@test/fakeData';
// import { TEST_DIRECTOR } from '@test/testData';
// import {
//   createApp,
//   createGroup,
//   createStudy,
//   getAccessToken,
// } from '@test/utils';
// import * as request from 'supertest';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;
//   let accessToken: string;
//   let studyId: string;

//   beforeAll(async () => {
//     app = await createApp();

//     const study = fakeData.study();

//     accessToken = await getAccessToken(TEST_DIRECTOR.MAX.EMAIL);

//     studyId = await createStudy(app, accessToken, study);
//   });

//   it('/PUT update group successfully', async () => {
//     const group = fakeData.group();
//     const groupId = await createGroup(app, accessToken, studyId, group);
//     const updatedGroup = fakeData.group();
//     return request(app.getHttpServer())
//       .put(`/studies/${studyId}/groups/${groupId}`)
//       .set('Authorization', `Bearer ${accessToken}`)
//       .send(updatedGroup)
//       .expect(200);
//   });

//   afterAll(async () => {
//     await app.close();
//   });
// });
