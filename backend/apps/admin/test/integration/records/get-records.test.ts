import { AppModule } from '@admin/app.module';
import datetime from '@shared/modules/datetime/datetime';
import { validateUUID } from '@shared/modules/uuid/uuid';
import {
  createDirector,
  getAdminAccessToken,
  getDirectorAccessToken,
} from '@test/admin/director';
import { getRecords } from '@test/admin/records';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import {
  TEST_DIRECTOR,
  TEST_STUDY,
  TEST_FORM,
  TEST_PARTICIPANT,
  TEST_GROUP,
  TEST_ENTITY,
} from '@test/testData';
//test
describe('Get Records', () => {
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

  it('should get records', () => {
    return getRecords(app, { accessToken, studyId })
      .expect(200)
      .then((res) => {
        const records = res.body;

        expect(Array.isArray(records)).toBe(true);
        expect(records.length).toBe(2);

        records.forEach((record) => {
          expect(validateUUID(record.id)).toBe(true);
          expect(datetime.isValidDateTime(record.createdAt)).toBe(true);
          expect(record.isDeleted).toBe(false);
          expect(record.isFailed).toBe(false);
          expect(record.failureReason).toBeNull();
          expect(record.task).toBeNull();

          expect(record.form.id).toBe(TEST_FORM.ID);
          expect(typeof record.form.name).toBe('string');

          expect(record.participant.id).toBe(TEST_PARTICIPANT.ID);
          expect(typeof record.participant.number).toBe('string');

          expect(record.participant.group.id).toBe(TEST_GROUP.ID);
          expect(typeof record.participant.group.name).toBe('string');

          expect(typeof record.fields).toBe('object');

          const textFormFieldData = record.fields[TEST_FORM.FIELDS.TEXT.ID];

          expect(typeof textFormFieldData).toBe('object');
          expect(validateUUID(textFormFieldData.id)).toBe(true);
          expect(typeof textFormFieldData.value).toBe('string');
          expect(textFormFieldData.entity.id).toBe(TEST_FORM.ENTITY.ID);
          expect(typeof textFormFieldData.entity.name).toBe('string');
          expect(textFormFieldData.field.id).toBe(TEST_ENTITY.FIELDS.TEXT.ID);
          expect(typeof textFormFieldData.field.name).toBe('string');
          expect(textFormFieldData.field.type).toBe('Text');

          const dateFormFieldData = record.fields[TEST_FORM.FIELDS.DATE.ID];

          expect(typeof dateFormFieldData).toBe('object');
          expect(validateUUID(dateFormFieldData.id)).toBe(true);
          expect(datetime.isValidDateTime(dateFormFieldData.value)).toBe(true);
          expect(dateFormFieldData.entity.id).toBe(TEST_FORM.ENTITY.ID);
          expect(typeof dateFormFieldData.entity.name).toBe('string');
          expect(dateFormFieldData.field.id).toBe(TEST_ENTITY.FIELDS.DATE.ID);
          expect(typeof dateFormFieldData.field.name).toBe('string');
          expect(dateFormFieldData.field.type).toBe('Date');
        });
      });
  });

  it('should fail because unauthorized', () => {
    return getRecords(app, { accessToken: undefined, studyId }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);
    return getRecords(app, { accessToken: adminAccessToken, studyId }).expect(
      401,
    );
  });

  it('should fail because director is not a member of study', async () => {
    const director = await createDirector(app);

    const otherAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    return getRecords(app, { accessToken: otherAccessToken, studyId }).expect(
      401,
    );
  });

  it('should fail because studyId is missing', async () => {
    return getRecords(app, { accessToken, studyId: undefined }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    return getRecords(app, { accessToken, studyId: fakeData.text() }).expect(
      401,
    );
  });

  it('should fail because studyId is unknown', async () => {
    return getRecords(app, { accessToken, studyId: fakeData.id() }).expect(401);
  });
});
