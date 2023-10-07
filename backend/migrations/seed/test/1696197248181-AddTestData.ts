import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  TEST_ENTITY,
  TEST_FORM,
  TEST_GROUP,
  TEST_PARTICIPANT,
  TEST_STUDY,
} from '@test/testData';

const studyId = TEST_STUDY.MAIN;
const groupId = TEST_GROUP.ID;
const participantId = TEST_PARTICIPANT.ID;

const entityId = TEST_ENTITY.ID;
const entityName = TEST_ENTITY.NAME;
const textFieldId = TEST_ENTITY.FIELDS.TEXT.ID;
const dateFieldId = TEST_ENTITY.FIELDS.DATE.ID;
const dateTimeFieldId = TEST_ENTITY.FIELDS.DATETIME.ID;
const timeFieldId = TEST_ENTITY.FIELDS.TIME.ID;

const formId = TEST_FORM.ID;
const pageId = TEST_FORM.PAGE.ID;
const textComponentId = TEST_FORM.COMPONENTS.TEXTFIELD.ID;
const dateComponentId = TEST_FORM.COMPONENTS.DATEPICKER.ID;
const dateTimeComponentId = TEST_FORM.COMPONENTS.DATETIMEPICKER.ID;
const timeComponentId = TEST_FORM.COMPONENTS.TIMEPICKER.ID;
const formEntityId = TEST_FORM.ENTITY.ID;
const textFormFieldId = TEST_FORM.FIELDS.TEXT.ID;
const dateFormFieldId = TEST_FORM.FIELDS.DATE.ID;
const timeFormFieldId = TEST_FORM.FIELDS.TIME.ID;
const dateTimeFormFieldId = TEST_FORM.FIELDS.DATETIME.ID;

const formConfigId = TEST_GROUP.FORM_CONFIG.ID;

const firstRecordId = '04a4db01-8a01-4f8f-add4-6b37a1fd4ff4';
const secondRecordId = 'e3cd8d75-127b-4312-b2a8-479778896a69';

const stringifyJSON = (data: any) => JSON.stringify(JSON.stringify(data));

// seed data for tests 123

export class AddTestData1696197248181 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('study_attribute', ['studyId', 'key', 'value'])
      .values([
        {
          studyId: () => `'${studyId}'`,
          key: 'duration',
          value: stringifyJSON(365),
        },
        {
          studyId: () => `'${studyId}'`,
          key: 'endDate',
          value: stringifyJSON('2030-12-31T00:00:00.000Z'),
        },
        {
          studyId: () => `'${studyId}'`,
          key: 'isActive',
          value: stringifyJSON(true),
        },
        {
          studyId: () => `'${studyId}'`,
          key: 'startDate',
          value: stringifyJSON('2023-08-01T00:00:00.000Z'),
        },
      ])
      .execute();

    // Insert into participant_attributes
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('participant_attributes', ['participantId', 'key', 'value'])
      .values({
        participantId: () => `'${participantId}'`,
        key: 'startedAt',
        value: stringifyJSON('2023-09-01T00:00:00.000Z'),
      })
      .execute();

    // Insert into entity
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('entity', ['id', 'name', 'studyId'])
      .values({
        id: () => `'${entityId}'`,
        name: entityName,
        studyId: () => `'${studyId}'`,
      })
      .execute();

    // Insert into entity_field
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('entity_field', ['id', 'entityId', 'name', 'type'])
      .values([
        {
          id: () => `'${textFieldId}'`,
          entityId: () => `'${entityId}'`,
          name: 'g98oYrb0x',
          type: 'Text',
        },
        {
          id: () => `'${dateFieldId}'`,
          entityId: () => `'${entityId}'`,
          name: '4nJBdVNeZ',
          type: 'Date',
        },
        {
          id: () => `'${dateTimeFieldId}'`,
          entityId: () => `'${entityId}'`,
          name: 'Zeitstempel',
          type: 'DateTime',
        },
        {
          id: () => `'${timeFieldId}'`,
          entityId: () => `'${entityId}'`,
          name: 'Uhrzeit',
          type: 'Time',
        },
      ])
      .execute();

    // Insert into form
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('form', ['id', 'studyId', 'name'])
      .values({
        id: () => `'${formId}'`,
        studyId: () => `'${studyId}'`,
        name: '4V4MJi5i',
      })
      .execute();

    // Insert into form_page
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('form_page', ['id', 'formId', 'number'])
      .values({
        id: () => `'${pageId}'`,
        formId: () => `'${formId}'`,
        number: 1,
      })
      .execute();

    // Insert into form_component
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('form_component', ['id', 'pageId', 'number', 'type'])
      .values([
        {
          id: () => `'${textComponentId}'`,
          pageId: () => `'${pageId}'`,
          number: 1,
          type: 'TextField',
        },
        {
          id: () => `'${dateComponentId}'`,
          pageId: () => `'${pageId}'`,
          number: 2,
          type: 'DatePicker',
        },
        {
          id: () => `'${dateTimeComponentId}'`,
          pageId: () => `'${pageId}'`,
          number: 3,
          type: 'DateTimePicker',
        },
        {
          id: () => `'${timeComponentId}'`,
          pageId: () => `'${pageId}'`,
          number: 4,
          type: 'TimePicker',
        },
      ])
      .execute();

    // Insert into form_component_attribute
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('form_component_attribute', ['componentId', 'key', 'value'])
      .values([
        {
          componentId: () => `'${dateComponentId}'`,
          key: 'required',
          value: '"true"',
        },
        {
          componentId: () => `'${textComponentId}'`,
          key: 'required',
          value: '"true"',
        },
        {
          componentId: () => `'${dateTimeComponentId}'`,
          key: 'required',
          value: '"true"',
        },
        {
          componentId: () => `'${timeComponentId}'`,
          key: 'required',
          value: '"true"',
        },
      ])
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('form_configuration', [
        'id',
        'formId',
        'studyId',
        'groupId',
        'isActive',
        'type',
      ])
      .values({
        id: () => `'${formConfigId}'`,
        formId: () => `'${formId}'`,
        studyId: () => `'${studyId}'`,
        groupId: () => `'${groupId}'`,
        isActive: 1,
        type: 'TimeIndependent',
      })
      .execute();

    // For instance, for form_entity:
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('form_entity', ['id', 'formId', 'entityId', 'name'])
      .values({
        id: () => `'${formEntityId}'`,
        formId: () => `'${formId}'`,
        entityId: () => `'${entityId}'`,
        name: 'xBsyIuqyHP',
      })
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('form_field', [
        'id',
        'entityId',
        'formComponentId',
        'entityFieldId',
      ])
      .values([
        {
          id: textFormFieldId,
          entityId: formEntityId,
          formComponentId: textComponentId,
          entityFieldId: textFieldId,
        },
        {
          id: dateFormFieldId,
          entityId: formEntityId,
          formComponentId: dateComponentId,
          entityFieldId: dateFieldId,
        },
        {
          id: dateTimeFormFieldId,
          entityId: formEntityId,
          formComponentId: dateTimeComponentId,
          entityFieldId: dateTimeFieldId,
        },
        {
          id: timeFormFieldId,
          entityId: formEntityId,
          formComponentId: timeComponentId,
          entityFieldId: timeFieldId,
        },
      ])
      .execute();

    // Insert into record
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('record', [
        'id',
        'formId',
        'participantId',
        'taskId',
        'failureReason',
      ])
      .values([
        {
          id: firstRecordId,
          formId: formId,
          participantId: participantId,
          taskId: null,
          failureReason: null,
        },
        {
          id: secondRecordId,
          formId: formId,
          participantId: participantId,
          taskId: null,
          failureReason: null,
        },
      ])
      .execute();

    // Insert into record_field
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('record_field', ['id', 'recordId', 'value', 'formFieldId'])
      .values([
        {
          id: '2719c806-3ce4-4882-89b0-dd6854405237',
          recordId: firstRecordId,
          value: stringifyJSON('test2'),
          formFieldId: textFormFieldId,
        },
        {
          id: '2b3a10ef-1719-470f-b194-5ab2f8a347c4',
          recordId: firstRecordId,
          value: stringifyJSON('2023-10-01T16:24:38.471Z'),
          formFieldId: dateFormFieldId,
        },
        {
          id: '9f59dfc1-83ce-49cb-a6a6-440fbbc31c0c',
          recordId: firstRecordId,
          value: stringifyJSON('16:24'),
          formFieldId: timeFormFieldId,
        },
        {
          id: '9cb1a760-80d5-4e0f-ac44-9c8bb6523af7',
          recordId: firstRecordId,
          value: stringifyJSON('2023-10-01T16:24:38.471Z'),
          formFieldId: dateTimeFormFieldId,
        },
        {
          id: '97763b50-a5f3-4185-baae-e618c463d040',
          recordId: secondRecordId,
          value: stringifyJSON('test'),
          formFieldId: textFormFieldId,
        },
        {
          id: 'b3788af8-a648-4b29-97d8-ed0671443c02',
          recordId: secondRecordId,
          value: stringifyJSON('2023-10-01T16:24:31.406Z'),
          formFieldId: dateFormFieldId,
        },
        {
          id: 'f7c489a6-c14a-4ee9-85fb-a6e115815b30',
          recordId: secondRecordId,
          value: stringifyJSON('12:12'),
          formFieldId: timeFormFieldId,
        },
        {
          id: 'f9cf9677-d697-4028-ae4d-383aa6614bd3',
          recordId: secondRecordId,
          value: stringifyJSON('2023-10-01T16:24:38.471Z'),
          formFieldId: dateTimeFormFieldId,
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
