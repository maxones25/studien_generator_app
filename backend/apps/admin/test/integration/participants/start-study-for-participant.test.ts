import { AppModule } from '@admin/app.module';
import datetime from '@shared/modules/datetime/datetime';
import { getDirectorAccessToken } from '@test/admin/director';
import { createFormId } from '@test/admin/forms';
import {
  activateForm,
  addScheduleId,
  createGroupFormId,
  createGroupId,
} from '@test/admin/groups';
import {
  createParticipantId,
  getTasksByParticipant,
} from '@test/admin/participants';
import { startParticipantStudy } from '@test/admin/participants/startParticipantStudy';
import { activateStudy, createStudyId } from '@test/admin/studies';
import { IApp, createApp, getEnvironmentVariable } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('start study for participant', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let participantId: string;
  let formId: string;
  let groupId: string;
  let formConfigId: string;
  let scheduleId: string;
  let startDate: Date;
  let endDate: Date;
  let duration: number;

  beforeAll(async () => {
    app = await createApp(AppModule);
    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );

    otherAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    studyId = await createStudyId(app, { accessToken });

    startDate = fakeData.futureDate();
    endDate = datetime.addDays(startDate, 90);
    duration = 30;

    await activateStudy(app, {
      accessToken,
      studyId,
      startDate,
      endDate,
      duration,
    });

    groupId = await createGroupId(app, {
      accessToken,
      studyId,
    });

    participantId = await createParticipantId(app, {
      accessToken,
      studyId,
      data: fakeData.participant(groupId),
    });

    formId = await createFormId(app, { accessToken, studyId });

    formConfigId = await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    await activateForm(app, {
      accessToken,
      studyId,
      formId: formConfigId,
    }).expect(200);

    scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId: formConfigId,
      type: 'Fix',
      period: 'Day',
      frequency: 1,
      postpone: null,
      restrict: null,
      times: ['08:00'],
    });
  });

  afterAll(async () => await app.close());

  it('should start study', async () => {
    await startParticipantStudy(app, {
      accessToken,
      studyId,
      participantId,
      startDate: datetime.formatDate(startDate),
      configs: [
        {
          id: formConfigId,
          schedules: [
            {
              id: scheduleId,
              times: ['08:00'],
            },
          ],
        },
      ],
    }).then((res) => {
      const uri = res.text;

      const studyURI = getEnvironmentVariable(app, 'STUDY_FRONTED_URI');

      expect(
        uri.startsWith(`${studyURI}/login?id=${participantId}&password=`),
      ).toBe(true);
    });

    return getTasksByParticipant(app, { accessToken, studyId, participantId })
      .expect(200)
      .then((res) => {
        const tasks = res.body;

        expect(tasks.length).toBe(duration);

        tasks.forEach((task) => {
          expect(task.completedAt).toBeNull();
          expect(task.rescheduled).toBe(0);
          expect(task.form.id).toBe(formId);
        });
      });
  });
});
