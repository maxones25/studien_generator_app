-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Erstellungszeit: 01. Okt 2023 um 18:11
-- Server-Version: 8.0.31
-- PHP-Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `studien_generator_app`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `appointment`
--

CREATE TABLE `appointment` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL,
  `startDate` date NOT NULL,
  `startTime` time NOT NULL,
  `endDate` date NOT NULL,
  `endTime` time NOT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `originId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `studyId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `groupId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `participantId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `chat`
--

CREATE TABLE `chat` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `participantId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `studyId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `chat_message`
--

CREATE TABLE `chat_message` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `chatId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `directorId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `participantId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sentAt` datetime NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `chat_message_receipt`
--

CREATE TABLE `chat_message_receipt` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `messageId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `directorId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `participantId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `readAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `director`
--

CREATE TABLE `director` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `firstName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `entity`
--

CREATE TABLE `entity` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `studyId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `entity_field`
--

CREATE TABLE `entity_field` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `entityId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('Number','Text','Boolean','Enum','DateTime','Date','Time') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `form`
--

CREATE TABLE `form` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `studyId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `form_component`
--

CREATE TABLE `form_component` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `pageId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` int NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `form_component_attribute`
--

CREATE TABLE `form_component_attribute` (
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `componentId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` json NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `form_configuration`
--

CREATE TABLE `form_configuration` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `formId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `studyId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `groupId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isActive` tinyint NOT NULL,
  `type` enum('TimeDependent','TimeIndependent') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `form_entity`
--

CREATE TABLE `form_entity` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `formId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `entityId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `form_field`
--

CREATE TABLE `form_field` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `entityId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `formComponentId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `entityFieldId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `form_page`
--

CREATE TABLE `form_page` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `formId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` int NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `form_schedule`
--

CREATE TABLE `form_schedule` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `configId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('Flexible','Fix') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `period` enum('Day','Week','Month') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `times` json NOT NULL,
  `postpone` json DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `restrict` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `form_schedule_attribute`
--

CREATE TABLE `form_schedule_attribute` (
  `scheduleId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` json NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `group`
--

CREATE TABLE `group` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `studyId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `migrations`
--

CREATE TABLE `migrations` (
  `id` int NOT NULL,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `participant`
--

CREATE TABLE `participant` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `groupId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `studyId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subscription` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `participant_attributes`
--

CREATE TABLE `participant_attributes` (
  `participantId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` json NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `participant_notification`
--

CREATE TABLE `participant_notification` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `participantId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `taskId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `readAt` datetime DEFAULT NULL,
  `processed` tinyint DEFAULT NULL,
  `oldDate` datetime DEFAULT NULL,
  `newDate` datetime DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `record`
--

CREATE TABLE `record` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `formId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `participantId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `taskId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `failureReason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `record_field`
--

CREATE TABLE `record_field` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `recordId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` json NOT NULL,
  `formFieldId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `study`
--

CREATE TABLE `study` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `study_attribute`
--

CREATE TABLE `study_attribute` (
  `studyId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` json NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `study_member`
--

CREATE TABLE `study_member` (
  `studyId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `directorId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `task`
--

CREATE TABLE `task` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `participantId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `formId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `scheduleId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `originalScheduledAt` datetime NOT NULL,
  `scheduledAt` datetime NOT NULL,
  `completedAt` datetime DEFAULT NULL,
  `rescheduled` int NOT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_649a30a9a9091fe917cc0891066` (`originId`),
  ADD KEY `FK_3fd6dae973c0ee2a4e949d3bffb` (`studyId`),
  ADD KEY `FK_f5b8d16b0a872453b8357ccdd87` (`groupId`),
  ADD KEY `FK_c9b42003bc5086f4b13a50ecc22` (`participantId`);

--
-- Indizes für die Tabelle `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_3f3aa88e9b715e0588e0de7664` (`participantId`),
  ADD KEY `FK_3da286180a6bc5252080abd90d6` (`studyId`);

--
-- Indizes für die Tabelle `chat_message`
--
ALTER TABLE `chat_message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_6d2db5b1118d92e561f5ebc1af0` (`chatId`),
  ADD KEY `FK_9c97c90c33d9e3dfb9f66cadac3` (`directorId`),
  ADD KEY `FK_5a9f8cc21d90e85d38da6f1d519` (`participantId`);

--
-- Indizes für die Tabelle `chat_message_receipt`
--
ALTER TABLE `chat_message_receipt`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ecdf9d9938ab9489474c34b76bd` (`messageId`),
  ADD KEY `FK_62ac4616e87a07e36f576926653` (`directorId`),
  ADD KEY `FK_bd4f493711b826b89f39c224286` (`participantId`);

--
-- Indizes für die Tabelle `director`
--
ALTER TABLE `director`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_ee3063e394bf69b0a6157fdaa6` (`email`);

--
-- Indizes für die Tabelle `entity`
--
ALTER TABLE `entity`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_name_for_study` (`name`,`studyId`),
  ADD KEY `FK_2846199c9df999cfa1377d73700` (`studyId`);

--
-- Indizes für die Tabelle `entity_field`
--
ALTER TABLE `entity_field`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_name_for_entity` (`name`,`entityId`),
  ADD KEY `FK_332fbac71f1d14895743673f802` (`entityId`);

--
-- Indizes für die Tabelle `form`
--
ALTER TABLE `form`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_name_for_study` (`studyId`,`name`);

--
-- Indizes für die Tabelle `form_component`
--
ALTER TABLE `form_component`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_number_for_form_page` (`pageId`,`number`);

--
-- Indizes für die Tabelle `form_component_attribute`
--
ALTER TABLE `form_component_attribute`
  ADD PRIMARY KEY (`componentId`,`key`);

--
-- Indizes für die Tabelle `form_configuration`
--
ALTER TABLE `form_configuration`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_form_config` (`formId`,`studyId`,`groupId`,`type`),
  ADD KEY `FK_4d14ee902bbee1adaa505626df1` (`studyId`),
  ADD KEY `FK_11a27cb99a7b82fef3be4a7a363` (`groupId`);

--
-- Indizes für die Tabelle `form_entity`
--
ALTER TABLE `form_entity`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_form_entity` (`formId`,`name`),
  ADD KEY `FK_59d37facb3632ac059beeea77dd` (`entityId`);

--
-- Indizes für die Tabelle `form_field`
--
ALTER TABLE `form_field`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_538bb503126c3610c8b1dcac296` (`entityId`),
  ADD KEY `FK_a3de2d2a60f5ceda5317eeb0acd` (`formComponentId`),
  ADD KEY `FK_d91d77c9f5e22f0de43c749e9bb` (`entityFieldId`);

--
-- Indizes für die Tabelle `form_page`
--
ALTER TABLE `form_page`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_number_for_form` (`formId`,`number`);

--
-- Indizes für die Tabelle `form_schedule`
--
ALTER TABLE `form_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_2c7456df55778cd93bfa0f100b7` (`configId`);

--
-- Indizes für die Tabelle `form_schedule_attribute`
--
ALTER TABLE `form_schedule_attribute`
  ADD PRIMARY KEY (`scheduleId`,`key`);

--
-- Indizes für die Tabelle `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_name_for_study` (`name`,`studyId`),
  ADD KEY `FK_6f2eb234617ce69fe1881929e5f` (`studyId`);

--
-- Indizes für die Tabelle `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `participant`
--
ALTER TABLE `participant`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_number_for_study` (`number`,`studyId`),
  ADD KEY `FK_6de7a06fe4024d952060d256071` (`studyId`),
  ADD KEY `FK_dc56154aca4ec8aaaa49e7f6f61` (`groupId`);

--
-- Indizes für die Tabelle `participant_attributes`
--
ALTER TABLE `participant_attributes`
  ADD PRIMARY KEY (`participantId`,`key`);

--
-- Indizes für die Tabelle `participant_notification`
--
ALTER TABLE `participant_notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_e6f6210c99ddb2b1cccb0bcdcb4` (`participantId`),
  ADD KEY `FK_0134553e5dcd951eed4e1db6156` (`taskId`);

--
-- Indizes für die Tabelle `record`
--
ALTER TABLE `record`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_e898d790f0802dfb794660ae90c` (`taskId`),
  ADD KEY `FK_c5bbc65a1bd183cddddc6168136` (`formId`),
  ADD KEY `FK_ee34be50b8951bb1f947a79a258` (`participantId`);

--
-- Indizes für die Tabelle `record_field`
--
ALTER TABLE `record_field`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_b0c92e92f6128c8f8a46e4c8abe` (`recordId`),
  ADD KEY `FK_33feea5012a7c8dd3d4c301e6d4` (`formFieldId`);

--
-- Indizes für die Tabelle `study`
--
ALTER TABLE `study`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_8b76a3627bb31d4880f7c5e9e0` (`name`);

--
-- Indizes für die Tabelle `study_attribute`
--
ALTER TABLE `study_attribute`
  ADD PRIMARY KEY (`studyId`,`key`);

--
-- Indizes für die Tabelle `study_member`
--
ALTER TABLE `study_member`
  ADD PRIMARY KEY (`studyId`,`directorId`),
  ADD KEY `FK_7e7b488366b97f7bbd99e83113a` (`directorId`);

--
-- Indizes für die Tabelle `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_9089499e180b2a26b69ca6103db` (`formId`),
  ADD KEY `FK_601ae6f67d1797ded76a98d83ad` (`scheduleId`),
  ADD KEY `FK_b2c69a1f99442585c69c75cd002` (`participantId`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `FK_3fd6dae973c0ee2a4e949d3bffb` FOREIGN KEY (`studyId`) REFERENCES `study` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_649a30a9a9091fe917cc0891066` FOREIGN KEY (`originId`) REFERENCES `appointment` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `FK_c9b42003bc5086f4b13a50ecc22` FOREIGN KEY (`participantId`) REFERENCES `participant` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_f5b8d16b0a872453b8357ccdd87` FOREIGN KEY (`groupId`) REFERENCES `group` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `FK_3da286180a6bc5252080abd90d6` FOREIGN KEY (`studyId`) REFERENCES `study` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_3f3aa88e9b715e0588e0de7664c` FOREIGN KEY (`participantId`) REFERENCES `participant` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `chat_message`
--
ALTER TABLE `chat_message`
  ADD CONSTRAINT `FK_5a9f8cc21d90e85d38da6f1d519` FOREIGN KEY (`participantId`) REFERENCES `participant` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_6d2db5b1118d92e561f5ebc1af0` FOREIGN KEY (`chatId`) REFERENCES `chat` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_9c97c90c33d9e3dfb9f66cadac3` FOREIGN KEY (`directorId`) REFERENCES `director` (`id`) ON DELETE SET NULL;

--
-- Constraints der Tabelle `chat_message_receipt`
--
ALTER TABLE `chat_message_receipt`
  ADD CONSTRAINT `FK_62ac4616e87a07e36f576926653` FOREIGN KEY (`directorId`) REFERENCES `director` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_bd4f493711b826b89f39c224286` FOREIGN KEY (`participantId`) REFERENCES `participant` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_ecdf9d9938ab9489474c34b76bd` FOREIGN KEY (`messageId`) REFERENCES `chat_message` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `entity`
--
ALTER TABLE `entity`
  ADD CONSTRAINT `FK_2846199c9df999cfa1377d73700` FOREIGN KEY (`studyId`) REFERENCES `study` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `entity_field`
--
ALTER TABLE `entity_field`
  ADD CONSTRAINT `FK_332fbac71f1d14895743673f802` FOREIGN KEY (`entityId`) REFERENCES `entity` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `form`
--
ALTER TABLE `form`
  ADD CONSTRAINT `FK_b083054fee722e4d7e30e0452c8` FOREIGN KEY (`studyId`) REFERENCES `study` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `form_component`
--
ALTER TABLE `form_component`
  ADD CONSTRAINT `FK_07806ec3a1b11fba12d167c730f` FOREIGN KEY (`pageId`) REFERENCES `form_page` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `form_component_attribute`
--
ALTER TABLE `form_component_attribute`
  ADD CONSTRAINT `FK_ac70cd6228cd438158e668de4d2` FOREIGN KEY (`componentId`) REFERENCES `form_component` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `form_configuration`
--
ALTER TABLE `form_configuration`
  ADD CONSTRAINT `FK_11a27cb99a7b82fef3be4a7a363` FOREIGN KEY (`groupId`) REFERENCES `group` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_4d14ee902bbee1adaa505626df1` FOREIGN KEY (`studyId`) REFERENCES `study` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_e49ae6603e619d0b8bb5fca6bc8` FOREIGN KEY (`formId`) REFERENCES `form` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `form_entity`
--
ALTER TABLE `form_entity`
  ADD CONSTRAINT `FK_466c754952e7c2cac407dd49dcb` FOREIGN KEY (`formId`) REFERENCES `form` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_59d37facb3632ac059beeea77dd` FOREIGN KEY (`entityId`) REFERENCES `entity` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `form_field`
--
ALTER TABLE `form_field`
  ADD CONSTRAINT `FK_538bb503126c3610c8b1dcac296` FOREIGN KEY (`entityId`) REFERENCES `form_entity` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_a3de2d2a60f5ceda5317eeb0acd` FOREIGN KEY (`formComponentId`) REFERENCES `form_component` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_d91d77c9f5e22f0de43c749e9bb` FOREIGN KEY (`entityFieldId`) REFERENCES `entity_field` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `form_page`
--
ALTER TABLE `form_page`
  ADD CONSTRAINT `FK_b0270fea3c98fd1fe75225924f7` FOREIGN KEY (`formId`) REFERENCES `form` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `form_schedule`
--
ALTER TABLE `form_schedule`
  ADD CONSTRAINT `FK_2c7456df55778cd93bfa0f100b7` FOREIGN KEY (`configId`) REFERENCES `form_configuration` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `form_schedule_attribute`
--
ALTER TABLE `form_schedule_attribute`
  ADD CONSTRAINT `FK_babbb93ca00b11647fab74d4450` FOREIGN KEY (`scheduleId`) REFERENCES `form_schedule` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `group`
--
ALTER TABLE `group`
  ADD CONSTRAINT `FK_6f2eb234617ce69fe1881929e5f` FOREIGN KEY (`studyId`) REFERENCES `study` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `participant`
--
ALTER TABLE `participant`
  ADD CONSTRAINT `FK_6de7a06fe4024d952060d256071` FOREIGN KEY (`studyId`) REFERENCES `study` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_dc56154aca4ec8aaaa49e7f6f61` FOREIGN KEY (`groupId`) REFERENCES `group` (`id`) ON DELETE SET NULL;

--
-- Constraints der Tabelle `participant_attributes`
--
ALTER TABLE `participant_attributes`
  ADD CONSTRAINT `FK_f8f6451da7d6e9cd88c4923149a` FOREIGN KEY (`participantId`) REFERENCES `participant` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `participant_notification`
--
ALTER TABLE `participant_notification`
  ADD CONSTRAINT `FK_0134553e5dcd951eed4e1db6156` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_e6f6210c99ddb2b1cccb0bcdcb4` FOREIGN KEY (`participantId`) REFERENCES `participant` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `record`
--
ALTER TABLE `record`
  ADD CONSTRAINT `FK_c5bbc65a1bd183cddddc6168136` FOREIGN KEY (`formId`) REFERENCES `form` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_e898d790f0802dfb794660ae90c` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `FK_ee34be50b8951bb1f947a79a258` FOREIGN KEY (`participantId`) REFERENCES `participant` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `record_field`
--
ALTER TABLE `record_field`
  ADD CONSTRAINT `FK_33feea5012a7c8dd3d4c301e6d4` FOREIGN KEY (`formFieldId`) REFERENCES `form_field` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `FK_b0c92e92f6128c8f8a46e4c8abe` FOREIGN KEY (`recordId`) REFERENCES `record` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `study_attribute`
--
ALTER TABLE `study_attribute`
  ADD CONSTRAINT `FK_e485f914bd1fff4dd9e003c6f5c` FOREIGN KEY (`studyId`) REFERENCES `study` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `study_member`
--
ALTER TABLE `study_member`
  ADD CONSTRAINT `FK_0658089da193bafe09a7a41e032` FOREIGN KEY (`studyId`) REFERENCES `study` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_7e7b488366b97f7bbd99e83113a` FOREIGN KEY (`directorId`) REFERENCES `director` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `FK_601ae6f67d1797ded76a98d83ad` FOREIGN KEY (`scheduleId`) REFERENCES `form_schedule` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `FK_9089499e180b2a26b69ca6103db` FOREIGN KEY (`formId`) REFERENCES `form` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_b2c69a1f99442585c69c75cd002` FOREIGN KEY (`participantId`) REFERENCES `participant` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
