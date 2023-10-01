START TRANSACTION;

SET @directorId = 'd98cd02e-1ebf-49f4-8b9b-df37ad78911e';  
SET @directorPassword = '$2b$10$m0NXohdDpH0yUqp2xJI39.laM3gntl47uaFThBFLglH2.t2nle3aq'; -- PW: 12345678 

SET @otherDirectorId = '91bffd5b-9b0f-49a5-851a-684133d5ac30';  
SET @otherDirectorPassword = '$2b$10$m0NXohdDpH0yUqp2xJI39.laM3gntl47uaFThBFLglH2.t2nle3aq'; -- PW: 12345678 

SET @studyId = 'ed450d39-b087-4ce9-a5fb-45b063e45c4a';  
SET @studyId2 = '2f03a1d3-da2f-43e6-b5da-2ae970f0b624';  

SET @groupId = '497d0534-de0a-4267-ae00-5221a0c6b6ef';  

SET @participant = '54feae71-a7ae-4752-b9b5-a908e2446d31';  
SET @participantPassword = '$2b$10$yZNDSG7UmGZTfda37Nmp0uvHOy6rRHYWp7UZnpfaINmYocJ/IhUE.'; -- PW: 0123456789AB

SET @entityId = 'c2c31a68-6bd7-48df-8d4b-47a95de8920f';
SET @textFieldId = '6f776404-0402-42ca-9649-bace38c52684';
SET @dateFieldId = 'cba34ffd-f3ce-4d64-928f-02a2f2bc3549';

SET @formId = '9cc9de50-065f-4ca9-88ad-b1453f51ee3e';
SET @pageId = '5d791f96-0622-4084-9079-2239c55e5b3e';
SET @formEntityId = 'c118259b-5c92-4cb3-ba51-d5b5a3a5b3b1';
SET @textComponentId = 'e52c9298-8b1e-4881-9572-9765bad2e8ee';
SET @dateComponentId = '8eb5a6dd-2652-42cc-8af1-45a267f44a62';
SET @textFormFieldId = '84b78ebb-0684-45b1-9663-8087738c6209';
SET @dateFormFieldId = 'bd99097c-fdd0-4cac-ac45-e9db68eae858';

SET @formConfigId = 'c2c7c9ed-ef54-4ca9-9106-4c7a0c66af83';

INSERT INTO `director` (`firstName`, `lastName`, `email`, `password`, `id`) VALUES
('Max', 'Mustermann', 'max.mustermann@test.de', @directorPassword, @directorId);
INSERT INTO `director` (`firstName`, `lastName`, `email`, `password`, `id`) VALUES
('John', 'Doe', 'john.doe@test.de', @otherDirectorPassword, @otherDirectorId);

-- Random Directors

INSERT INTO `director` (`firstName`, `lastName`, `email`, `password`, `id`) VALUES
('Alice', 'Smith', 'alice.smith@test.de', @otherDirectorPassword, '1b163c55-d8ee-4325-951d-baa07bc146ea');

INSERT INTO `director` (`firstName`, `lastName`, `email`, `password`, `id`) VALUES
('Bob', 'Johnson', 'bob.johnson@test.de', @otherDirectorPassword, '2d28f5cb-8f49-4895-8545-e3e37566e388');

INSERT INTO `director` (`firstName`, `lastName`, `email`, `password`, `id`) VALUES
('Catherine', 'Williams', 'catherine.williams@test.de', @otherDirectorPassword, '61b3172f-b71b-4f19-8edf-5021dd6b20e1');

INSERT INTO `director` (`firstName`, `lastName`, `email`, `password`, `id`) VALUES
('David', 'Brown', 'david.brown@test.de', @otherDirectorPassword, '927144dd-2ee7-4544-bc56-57f45f38833d');

INSERT INTO `director` (`firstName`, `lastName`, `email`, `password`, `id`) VALUES
('Eva', 'Jones', 'eva.jones@test.de', @otherDirectorPassword, 'b6723b20-38a8-4516-9eac-42bda8b7412f');

INSERT INTO `study`(`id`, `name`) VALUES (@studyId,'Test Studie 1');
INSERT INTO `study`(`id`, `name`) VALUES (@studyId2,'Test Studie 2');

INSERT INTO `study_member` (`studyId`, `directorId`, `role`) VALUES (@studyId, @directorId, 'admin');
INSERT INTO `study_member` (`studyId`, `directorId`, `role`) VALUES (@studyId, @otherDirectorId, 'admin');

INSERT INTO `group` (`id`, `name`, `studyId`) VALUES (@groupId, 'Gruppe 1', @studyId);

INSERT INTO `participant` (`id`, `number`, `password`, `groupId`, `studyId`) VALUES (@participant, '001', @participantPassword, @groupId, @studyId);

INSERT INTO `chat` (`id`, `participantId`, `studyId`) VALUES ('59ef2c9c-6eaf-4768-b628-d8e875687723', @participant, @studyId);

--
-- Daten für Tabelle `study_attribute`
--

INSERT INTO `study_attribute` (`studyId`, `key`, `value`, `createdAt`, `modifiedAt`, `deletedAt`) VALUES
(@studyId, 'duration', '\"365\"', '2023-10-01 16:04:44', '2023-10-01 16:04:44', NULL),
(@studyId, 'endDate', '\"\\\"2030-12-31T00:00:00.000Z\\\"\"', '2023-10-01 16:04:41', '2023-10-01 16:04:41', NULL),
(@studyId, 'isActive', '\"true\"', '2023-10-01 16:04:45', '2023-10-01 16:04:45', NULL),
(@studyId, 'startDate', '\"\\\"2023-08-01T00:00:00.000Z\\\"\"', '2023-10-01 16:04:27', '2023-10-01 16:04:27', NULL);

--
-- Daten für Tabelle `participant_attributes`
--

INSERT INTO `participant_attributes` (`participantId`, `key`, `value`, `createdAt`, `modifiedAt`, `deletedAt`) VALUES
(@participant, 'startedAt', '\"\\\"2023-09-01T00:00:00.000Z\\\"\"', '2023-10-01 16:09:05', '2023-10-01 16:09:05', NULL);

--
-- Daten für Tabelle `entity`
--

INSERT INTO `entity` (`id`, `createdAt`, `modifiedAt`, `name`, `studyId`, `deletedAt`) VALUES
(@entityId, '2023-10-01 15:28:52', '2023-10-01 15:28:52', 'hxgEe00CvK', @studyId, NULL);

--
-- Daten für Tabelle `entity_field`
--

INSERT INTO `entity_field` (`id`, `createdAt`, `modifiedAt`, `entityId`, `name`, `type`, `deletedAt`) VALUES
(@textFieldId, '2023-10-01 15:28:52', '2023-10-01 15:28:52', @entityId, 'g98oYrb0x', 'Text', NULL),
(@dateFieldId, '2023-10-01 15:28:52', '2023-10-01 15:28:52', @entityId, '4nJBdVNeZ', 'Date', NULL);

--
-- Daten für Tabelle `form`
--

INSERT INTO `form` (`id`, `createdAt`, `modifiedAt`, `studyId`, `name`, `deletedAt`) VALUES
(@formId, '2023-10-01 15:28:52', '2023-10-01 15:28:52', @studyId, '4V4MJi5i', NULL);

--
-- Daten für Tabelle `form_page`
--

INSERT INTO `form_page` (`id`, `createdAt`, `modifiedAt`, `formId`, `number`, `deletedAt`) VALUES
(@pageId, '2023-10-01 15:28:52', '2023-10-01 15:28:52', @formId, 1, NULL);

--
-- Daten für Tabelle `form_component`
--

INSERT INTO `form_component` (`id`, `createdAt`, `modifiedAt`, `pageId`, `number`, `type`, `deletedAt`) VALUES
(@dateComponentId, '2023-10-01 15:28:52', '2023-10-01 15:28:52', @pageId, 2, 'DatePicker', NULL),
(@textComponentId, '2023-10-01 15:28:52', '2023-10-01 15:28:52', @pageId, 1, 'TextField', NULL);

--
-- Daten für Tabelle `form_component_attribute`
--

INSERT INTO `form_component_attribute` (`createdAt`, `modifiedAt`, `componentId`, `key`, `value`, `deletedAt`) VALUES
('2023-10-01 15:28:52', '2023-10-01 15:28:52', @dateComponentId, 'required', '\"true\"', NULL),
('2023-10-01 15:28:52', '2023-10-01 15:28:52', @textComponentId, 'required', '\"true\"', NULL);

--
-- Daten für Tabelle `form_configuration`
--

INSERT INTO `form_configuration` (`id`, `createdAt`, `modifiedAt`, `formId`, `studyId`, `groupId`, `isActive`, `type`, `deletedAt`) VALUES
(@formConfigId, '2023-10-01 15:28:52', '2023-10-01 15:28:52', @formId, @studyId, @groupId, 1, 'TimeIndependent', NULL);

--
-- Daten für Tabelle `form_entity`
--

INSERT INTO `form_entity` (`id`, `createdAt`, `modifiedAt`, `formId`, `entityId`, `name`, `deletedAt`) VALUES
(@formEntityId, '2023-10-01 15:28:52', '2023-10-01 15:28:52', @formId, @entityId, 'xBsyIuqyHP', NULL);

--
-- Daten für Tabelle `form_field`
--

INSERT INTO `form_field` (`id`, `createdAt`, `modifiedAt`, `entityId`, `formComponentId`, `entityFieldId`, `deletedAt`) VALUES
(@textFormFieldId, '2023-10-01 15:28:52', '2023-10-01 15:28:52', @formEntityId, @textComponentId, @textFieldId, NULL),
(@dateFormFieldId, '2023-10-01 15:28:52', '2023-10-01 15:28:52', @formEntityId, @dateComponentId, @dateFieldId, NULL);

--
-- Daten für Tabelle `record`
--

INSERT INTO `record` (`id`, `createdAt`, `modifiedAt`, `formId`, `participantId`, `taskId`, `failureReason`, `deletedAt`) VALUES
('04a4db01-8a01-4f8f-add4-6b37a1fd4ff4', '2023-10-01 16:24:41', '2023-10-01 16:24:41', '9cc9de50-065f-4ca9-88ad-b1453f51ee3e', '54feae71-a7ae-4752-b9b5-a908e2446d31', NULL, NULL, NULL),
('e3cd8d75-127b-4312-b2a8-479778896a69', '2023-10-01 16:24:36', '2023-10-01 16:24:35', '9cc9de50-065f-4ca9-88ad-b1453f51ee3e', '54feae71-a7ae-4752-b9b5-a908e2446d31', NULL, NULL, NULL);


--
-- Daten für Tabelle `record_field`
--

INSERT INTO `record_field` (`id`, `recordId`, `value`, `formFieldId`, `createdAt`, `modifiedAt`, `deletedAt`) VALUES
('2719c806-3ce4-4882-89b0-dd6854405237', '04a4db01-8a01-4f8f-add4-6b37a1fd4ff4', '\"\\\"test2\\\"\"', '84b78ebb-0684-45b1-9663-8087738c6209', '2023-10-01 16:24:41', '2023-10-01 16:24:41', NULL),
('2b3a10ef-1719-470f-b194-5ab2f8a347c4', '04a4db01-8a01-4f8f-add4-6b37a1fd4ff4', '\"\\\"2023-10-01T16:24:38.471Z\\\"\"', 'bd99097c-fdd0-4cac-ac45-e9db68eae858', '2023-10-01 16:24:41', '2023-10-01 16:24:41', NULL),
('97763b50-a5f3-4185-baae-e618c463d040', 'e3cd8d75-127b-4312-b2a8-479778896a69', '\"\\\"test\\\"\"', '84b78ebb-0684-45b1-9663-8087738c6209', '2023-10-01 16:24:35', '2023-10-01 16:24:35', NULL),
('b3788af8-a648-4b29-97d8-ed0671443c02', 'e3cd8d75-127b-4312-b2a8-479778896a69', '\"\\\"2023-10-01T16:24:31.406Z\\\"\"', 'bd99097c-fdd0-4cac-ac45-e9db68eae858', '2023-10-01 16:24:35', '2023-10-01 16:24:35', NULL);


COMMIT;