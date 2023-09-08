import { createApp, getDirectorAccessToken } from '@test/utils';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@admin/app.module';
import request from 'supertest';
import { TEST_CHAT, TEST_DIRECTOR } from '@test/testData';
import faker from '@test/fakeData'; 
import { LoginDirectorDto } from '@admin/auth/dtos/LoginDirectorDto';

describe('post message', () => {
  let app: INestApplication;
  let director: LoginDirectorDto;
  let directorId: string;
  let chatId: string;
  let accessToken: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

    director = {
      email: TEST_DIRECTOR.MAX.EMAIL,
      password: TEST_DIRECTOR.MAX.PASSWORD
    };

    directorId = TEST_DIRECTOR.MAX.ID

    chatId = TEST_CHAT.ID;

    accessToken = await getDirectorAccessToken(app, director.email, director.password);
  });

  it('should post message successfully', async () => {
    const addMessageDto = faker.chatMessageAdmin(directorId, chatId);
    return request(app.getHttpServer())
      .post(`/chat`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(addMessageDto)
      .expect(201)
  });

  afterAll(async () => {
    await app.close();
  });
});
