import { AppModule } from '@admin/app.module';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp, createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/auth/loginAdmin';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import { createDirector } from '@test/director/signUpDirector';
import fakeData from '@test/fakeData';
import { createFormId } from '@test/forms/createForm';
import { createGroupId } from '@test/groups/createGroup';
import {
  addFormToGroup,
  createGroupFormId,
} from '@test/groups/forms/addFormToGroup';
import { getFormsByGroup } from '@test/groups/forms/getFormsByGroup';
import { removeFormFromGroup } from '@test/groups/forms/removeFromGroup';
import { createStudyId } from '@test/studies/createStudy';
import { addMember } from '@test/studies/members/addMember';
import { TEST_DIRECTOR } from '@test/testData';

describe('remove form from group', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let groupId: string;
  let groupData: any;

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

    groupData = fakeData.group();

    groupId = await createGroupId(app, {
      accessToken,
      studyId,
      data: groupData,
    });
  });

  afterAll(async () => {
    return await app.close();
  });

  it('should remove form from group', async () => {
    const formData = fakeData.form();

    const formId = await createFormId(app, {
      accessToken,
      studyId,
      data: formData,
    });

    const groupFormId = await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    await removeFormFromGroup(app, {
      accessToken,
      studyId,
      formId: groupFormId,
    }).expect(200);

    return await getFormsByGroup(app, { accessToken, studyId, groupId }).then(
      (res) => {
        const forms = res.body;

        expect(Array.isArray(forms)).toBeTruthy();

        const form = forms.find((form) => form.form.id === groupFormId);

        expect(form).toBeUndefined();
      },
    );
  });

  it('should fail because unauthorized', async () => {
    const formData = fakeData.form();

    const formId = await createFormId(app, {
      accessToken,
      studyId,
      data: formData,
    });

    const groupFormId = await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    return await removeFormFromGroup(app, {
      accessToken: undefined,
      studyId,
      formId: groupFormId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const formData = fakeData.form();

    const formId = await createFormId(app, {
      accessToken,
      studyId,
      data: formData,
    });

    const groupFormId = await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    const adminAccessToken = await getAdminAccessToken(app);

    return await removeFormFromGroup(app, {
      accessToken: adminAccessToken,
      studyId,
      formId: groupFormId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const formData = fakeData.form();

    const formId = await createFormId(app, {
      accessToken,
      studyId,
      data: formData,
    });

    const groupFormId = await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    return await removeFormFromGroup(app, {
      accessToken: otherAccessToken,
      studyId,
      formId: groupFormId,
    }).expect(401);
  });

  it('should fail because director is not admin', async () => {
    const director = await createDirector(app);

    await addMember(app, {
      accessToken,
      studyId,
      directorId: director.id,
      role: 'employee',
    });

    const formData = fakeData.form();

    const formId = await createFormId(app, {
      accessToken,
      studyId,
      data: formData,
    });

    const groupFormId = await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    const employeeAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    return await removeFormFromGroup(app, {
      accessToken: employeeAccessToken,
      studyId,
      formId: groupFormId,
    }).expect(401);
  });

  it('should fail because studyId missing', async () => {
    const formData = fakeData.form();

    const formId = await createFormId(app, {
      accessToken,
      studyId,
      data: formData,
    });

    const groupFormId = await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    return await removeFormFromGroup(app, {
      accessToken,
      studyId: undefined,
      formId: groupFormId,
    }).expect(400);
  });

  it('should fail because studyId invalid', async () => {
    const formData = fakeData.form();

    const formId = await createFormId(app, {
      accessToken,
      studyId,
      data: formData,
    });

    const groupFormId = await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    return await removeFormFromGroup(app, {
      accessToken,
      studyId: fakeData.text(),
      formId: groupFormId,
    }).expect(401);
  });

  it('should fail because studyId unknown', async () => {
    const formData = fakeData.form();

    const formId = await createFormId(app, {
      accessToken,
      studyId,
      data: formData,
    });

    const groupFormId = await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    return await removeFormFromGroup(app, {
      accessToken,
      studyId: fakeData.id(),
      formId: groupFormId,
    }).expect(401);
  });

  it('should fail because formId missing', async () => {
    const formData = fakeData.form();

    const formId = await createFormId(app, {
      accessToken,
      studyId,
      data: formData,
    });

    await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    return await removeFormFromGroup(app, {
      accessToken,
      studyId,
      formId: undefined,
    }).expect(400);
  });

  it('should fail because formId invalid', async () => {
    const formData = fakeData.form();

    const formId = await createFormId(app, {
      accessToken,
      studyId,
      data: formData,
    });

    await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    return await removeFormFromGroup(app, {
      accessToken,
      studyId,
      formId: fakeData.text(),
    }).expect(401);
  });

  it('should fail because formId unknown', async () => {
    const formData = fakeData.form();

    const formId = await createFormId(app, {
      accessToken,
      studyId,
      data: formData,
    });

    await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });

    return await removeFormFromGroup(app, {
      accessToken,
      studyId,
      formId: fakeData.id(),
    }).expect(401);
  });
});
