import { AppModule } from '@admin/app.module';
import {
  getDirectorAccessToken,
  getAdminAccessToken,
  createDirector,
} from '@test/admin/director';
import { getRecords } from '@test/admin/records';
import { exportRecords } from '@test/admin/records/exportRecords';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR, TEST_STUDY } from '@test/testData';

const columns = [
  {
    id: 'participant.number',
    name: 'Proband',
    type: 'Text',
    ref: {
      name: 'participants',
      id: 'participant.id',
    },
  },
  {
    id: 'participant.group.name',
    name: 'Gruppe',
    type: 'Text',
    ref: {
      name: 'groups',
      id: 'participant.group.id',
    },
  },
  {
    id: 'form.name',
    name: 'Formular',
    type: 'Text',
  },
  {
    id: 'fields.bd99097c-fdd0-4cac-ac45-e9db68eae858.value',
    name: '4nJBdVNeZ (xBsyIuqyHP)',
    type: 'Date',
  },
  {
    id: 'fields.84b78ebb-0684-45b1-9663-8087738c6209.value',
    name: 'g98oYrb0x (xBsyIuqyHP)',
    type: 'Text',
  },
];
//test
describe('export records', () => {
  let app: IApp;
  let accessToken: string;
  let studyId: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );

    studyId = TEST_STUDY.MAIN;
  });

  afterAll(async () => await app.close());

  it('should export records', () => {
    return exportRecords(app, { accessToken, studyId, columns })
      .expect(200)
      .then((res) => {
        const data = res.text;

        const expectedData = `"Proband";"Gruppe";"Formular";"4nJBdVNeZ (xBsyIuqyHP)";"g98oYrb0x (xBsyIuqyHP)"\n"001";"Gruppe 1";"4V4MJi5i";"2023-10-01";"test2"\n"001";"Gruppe 1";"4V4MJi5i";"2023-10-01";"test"`;

        expect(data).toBe(expectedData);
      });
  });

  it('should fail because unauthorized', () => {
    return exportRecords(app, {
      accessToken: undefined,
      studyId,
      columns,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);
    return exportRecords(app, {
      accessToken: adminAccessToken,
      studyId,
      columns,
    }).expect(401);
  });

  it('should fail because director is not a member of study', async () => {
    const director = await createDirector(app);

    const otherAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    return exportRecords(app, {
      accessToken: otherAccessToken,
      studyId,
      columns,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    return exportRecords(app, {
      accessToken,
      studyId: undefined,
      columns,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    return exportRecords(app, {
      accessToken,
      studyId: fakeData.text(),
      columns,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    return exportRecords(app, {
      accessToken,
      studyId: fakeData.id(),
      columns,
    }).expect(401);
  });

  it('should fail because columns is missing', async () => {
    return exportRecords(app, {
      accessToken,
      studyId,
      columns: undefined,
    }).expect(400);
  });

  it('should fail because columns is wrong type', async () => {
    return exportRecords(app, {
      accessToken,
      studyId,
      columns: 'test',
    }).expect(400);
  });

  it('should fail because columns is empty', async () => {
    return exportRecords(app, {
      accessToken,
      studyId,
      columns: [],
    }).expect(400);
  });

  it('should fail because column is empty', async () => {
    return exportRecords(app, {
      accessToken,
      studyId,
      columns: [{}],
    }).expect(400);
  });

  it('should fail because column id is invalid', async () => {
    return exportRecords(app, {
      accessToken,
      studyId,
      columns: [{ id: undefined }],
    }).expect(400);
  });

  it('should fail because column type is invalid', async () => {
    return exportRecords(app, {
      accessToken,
      studyId,
      columns: [{ type: undefined }],
    }).expect(400);
  });

  it('should fail because column name is invalid', async () => {
    return exportRecords(app, {
      accessToken,
      studyId,
      columns: [{ name: undefined }],
    }).expect(400);
  });
});
