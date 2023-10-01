import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  TEST_ENTITY,
  TEST_FORM,
  TEST_GROUP,
  TEST_PARTICIPANT,
  TEST_STUDY,
} from '@test/testData';
import { StudyAttribute } from '@entities/schema';

const studyId = TEST_STUDY.MAIN;
const participantId = TEST_PARTICIPANT.ID;
const entityId = TEST_ENTITY.ID;
const textFieldId = TEST_ENTITY.FIELDS.TEXT.ID;
const dateFieldId = TEST_ENTITY.FIELDS.DATE.ID;
const formId = TEST_FORM.ID;
const pageId = TEST_FORM.PAGE.ID;
const textComponentId = TEST_FORM.COMPONENTS.TEXTFIELD.ID;
const dateComponentId = TEST_FORM.COMPONENTS.DATEPICKER.ID;
const formEntityId = TEST_FORM.ENTITY.ID;
const groupId = TEST_GROUP.ID;
const formConfigId = TEST_GROUP.FORM_CONFIG.ID;
const firstRecordId = '04a4db01-8a01-4f8f-add4-6b37a1fd4ff4';
const secondRecordId = 'e3cd8d75-127b-4312-b2a8-479778896a69';
const textFormFieldId = TEST_FORM.FIELDS.TEXT.ID;
const dateFormFieldId = TEST_FORM.FIELDS.DATE.ID;

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
          value: () => '"365"',
        },
        {
          studyId: () => `'${studyId}'`,
          key: 'endDate',
          value: () => '"\\"2030-12-31T00:00:00.000Z\\""',
        },
        {
          studyId: () => `'${studyId}'`,
          key: 'isActive',
          value: () => '"true"',
        },
        {
          studyId: () => `'${studyId}'`,
          key: 'startDate',
          value: () => '"\\"2023-08-01T00:00:00.000Z\\""',
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
        value: () => '"\\"2023-09-01T00:00:00.000Z\\""',
      })
      .execute();

    // Insert into entity
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('entity', ['id', 'name', 'studyId'])
      .values({
        id: () => `'${entityId}'`,
        name: 'hxgEe00CvK',
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
          id: () => `'${dateComponentId}'`,
          pageId: () => `'${pageId}'`,
          number: 2,
          type: 'DatePicker',
        },
        {
          id: () => `'${textComponentId}'`,
          pageId: () => `'${pageId}'`,
          number: 1,
          type: 'TextField',
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
          value: '"test2"',
          formFieldId: textFormFieldId,
        },
        {
          id: '2b3a10ef-1719-470f-b194-5ab2f8a347c4',
          recordId: firstRecordId,
          value: '"2023-10-01T16:24:38.471Z"',
          formFieldId: dateFormFieldId,
        },
        {
          id: '97763b50-a5f3-4185-baae-e618c463d040',
          recordId: secondRecordId,
          value: '"test"',
          formFieldId: textFormFieldId,
        },
        {
          id: 'b3788af8-a648-4b29-97d8-ed0671443c02',
          recordId: secondRecordId,
          value: '"2023-10-01T16:24:31.406Z"',
          formFieldId: dateFormFieldId,
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
