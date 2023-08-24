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

INSERT INTO `study`(`id`, `name`) VALUES (@studyId,'Test Studie 1');
INSERT INTO `study`(`id`, `name`) VALUES (@studyId2,'Test Studie 2');

INSERT INTO `study_member` (`studyId`, `directorId`, `role`) VALUES (@studyId, @directorId, 'admin');
INSERT INTO `study_member` (`studyId`, `directorId`, `role`) VALUES (@studyId, @otherDirectorId, 'admin');

INSERT INTO `group` (`id`, `name`, `studyId`) VALUES (@groupId, 'Gruppe 1', @studyId);

INSERT INTO `participant` (`id`, `number`, `password`, `groupId`, `studyId`) VALUES (@participant, '001', @participantPassword, @groupId, @studyId);

INSERT INTO `chat` (`id`, `participantId`, `studyId`) VALUES ('59ef2c9c-6eaf-4768-b628-d8e875687723', @participant, @studyId);

COMMIT;