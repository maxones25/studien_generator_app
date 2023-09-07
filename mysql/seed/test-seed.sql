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
('David', 'Brown', 'david.brown@test.de', @otherDirectorPassword, '9271d4dd-2ee7-4544-bc56-57f45f38833d');

INSERT INTO `director` (`firstName`, `lastName`, `email`, `password`, `id`) VALUES
('Eva', 'Jones', 'eva.jones@test.de', @otherDirectorPassword, 'b6723b20-38a8-4516-9eac-42bda8b7412f');


INSERT INTO `study`(`id`, `name`) VALUES (@studyId,'Test Studie 1');
INSERT INTO `study`(`id`, `name`) VALUES (@studyId2,'Test Studie 2');

INSERT INTO `study_member` (`studyId`, `directorId`, `role`) VALUES (@studyId, @directorId, 'admin');
INSERT INTO `study_member` (`studyId`, `directorId`, `role`) VALUES (@studyId, @otherDirectorId, 'admin');

INSERT INTO `group` (`id`, `name`, `studyId`) VALUES (@groupId, 'Gruppe 1', @studyId);

INSERT INTO `participant` (`id`, `number`, `password`, `groupId`, `studyId`) VALUES (@participant, '001', @participantPassword, @groupId, @studyId);

INSERT INTO `chat` (`id`, `participantId`, `studyId`) VALUES ('59ef2c9c-6eaf-4768-b628-d8e875687723', @participant, @studyId);

COMMIT;