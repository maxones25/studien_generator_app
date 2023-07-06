START TRANSACTION;

SET @directorId = 'd98cd02e-1ebf-49f4-8b9b-df37ad78911e';  
SET @directorPassword = '$2b$10$m0NXohdDpH0yUqp2xJI39.laM3gntl47uaFThBFLglH2.t2nle3aq'; -- PW: 12345678 

SET @studyId = 'ed450d39-b087-4ce9-a5fb-45b063e45c4a';  

SET @groupId = '497d0534-de0a-4267-ae00-5221a0c6b6ef';  

SET @participant = '54feae71-a7ae-4752-b9b5-a908e2446d31';  
SET @participantPassword = '0123456789AB';

INSERT INTO `director` (`firstName`, `lastName`, `email`, `password`, `id`) VALUES
('Max', 'Mustermann', 'max.mustermann@test.de', @directorPassword, @directorId);
INSERT INTO `director` (`firstName`, `lastName`, `email`, `password`, `id`) VALUES
('Max', 'Stock', 'maximilian.stock@t-online.de', '$2b$10$RU2sgtOEA7XeWlXPV0wJH.9z24KHL.qsfcwbjNTjZMmRiLMWOXFnG', '2b2f9f85-358d-49b4-b557-02e3b5d5c7ba');
INSERT INTO `director` (`firstName`, `lastName`, `email`, `password`, `id`) VALUES
('Mika', 'Schmidt', 'mika@schmidt.de', '$2b$10$jhSGL2gaLlJ4DBGpFbuBOuCvOYc7zNvgEoF7yUyrli0rSvws0ZX4C', '57318d97-cc08-45fd-945d-ee551dacc7e5');

INSERT INTO `study`(`id`, `name`) VALUES (@studyId,'Test Studie');

INSERT INTO `study_member` (`studyId`, `directorId`, `role`) VALUES (@studyId, @directorId, 'admin');

INSERT INTO `group` (`id`, `name`, `studyId`) VALUES (@groupId, 'Gruppe 1', @studyId);

INSERT INTO `participant` (`id`, `number`, `password`, `groupId`, `studyId`) VALUES (@participant, '001', @participantPassword, @groupId, @studyId);

COMMIT;