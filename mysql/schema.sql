-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Erstellungszeit: 04. Jul 2023 um 14:32
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
-- Tabellenstruktur für Tabelle `director`
--

CREATE TABLE `director` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `firstName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `entity`
--

CREATE TABLE `entity` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `studyId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `entity_field`
--

CREATE TABLE `entity_field` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` json DEFAULT NULL,
  `entityId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `groupId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `entity_field_attribute`
--

CREATE TABLE `entity_field_attribute` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fieldId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` json NOT NULL,
  `groupId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `form`
--

CREATE TABLE `form` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `entityId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `groupId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `data` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `group`
--

CREATE TABLE `group` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `studyId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `participant`
--

CREATE TABLE `participant` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `groupId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `studyId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `study`
--

CREATE TABLE `study` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `study_member`
--

CREATE TABLE `study_member` (
  `studyId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `directorId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indizes der exportierten Tabellen
--

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
  ADD KEY `FK_332fbac71f1d14895743673f802` (`entityId`),
  ADD KEY `FK_2b979c784205f95f48d9d56f0a2` (`groupId`);

--
-- Indizes für die Tabelle `entity_field_attribute`
--
ALTER TABLE `entity_field_attribute`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_key_for_concrete_entity` (`fieldId`,`key`),
  ADD KEY `FK_6d0d5b0460eada44c40055f289c` (`groupId`);

--
-- Indizes für die Tabelle `form`
--
ALTER TABLE `form`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_form_for_group` (`entityId`,`groupId`),
  ADD KEY `FK_75ea6121b76f11dc03a6334e828` (`groupId`);

--
-- Indizes für die Tabelle `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_name_for_study` (`name`,`studyId`),
  ADD KEY `FK_6f2eb234617ce69fe1881929e5f` (`studyId`);

--
-- Indizes für die Tabelle `participant`
--
ALTER TABLE `participant`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_number_for_study` (`number`,`studyId`),
  ADD KEY `FK_6de7a06fe4024d952060d256071` (`studyId`),
  ADD KEY `FK_dc56154aca4ec8aaaa49e7f6f61` (`groupId`);

--
-- Indizes für die Tabelle `study`
--
ALTER TABLE `study`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_8b76a3627bb31d4880f7c5e9e0` (`name`);

--
-- Indizes für die Tabelle `study_member`
--
ALTER TABLE `study_member`
  ADD PRIMARY KEY (`studyId`,`directorId`),
  ADD KEY `FK_7e7b488366b97f7bbd99e83113a` (`directorId`);

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `entity`
--
ALTER TABLE `entity`
  ADD CONSTRAINT `FK_2846199c9df999cfa1377d73700` FOREIGN KEY (`studyId`) REFERENCES `study` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `entity_field`
--
ALTER TABLE `entity_field`
  ADD CONSTRAINT `FK_2b979c784205f95f48d9d56f0a2` FOREIGN KEY (`groupId`) REFERENCES `group` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_332fbac71f1d14895743673f802` FOREIGN KEY (`entityId`) REFERENCES `entity` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `entity_field_attribute`
--
ALTER TABLE `entity_field_attribute`
  ADD CONSTRAINT `FK_6d0d5b0460eada44c40055f289c` FOREIGN KEY (`groupId`) REFERENCES `group` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_8abc19c63dd4d09efde3e5ab575` FOREIGN KEY (`fieldId`) REFERENCES `entity_field` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `form`
--
ALTER TABLE `form`
  ADD CONSTRAINT `FK_2da0fbfe9646e4ebefcae5d6879` FOREIGN KEY (`entityId`) REFERENCES `entity` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_75ea6121b76f11dc03a6334e828` FOREIGN KEY (`groupId`) REFERENCES `group` (`id`) ON DELETE CASCADE;

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
  ADD CONSTRAINT `FK_dc56154aca4ec8aaaa49e7f6f61` FOREIGN KEY (`groupId`) REFERENCES `group` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `study_member`
--
ALTER TABLE `study_member`
  ADD CONSTRAINT `FK_0658089da193bafe09a7a41e032` FOREIGN KEY (`studyId`) REFERENCES `study` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_7e7b488366b97f7bbd99e83113a` FOREIGN KEY (`directorId`) REFERENCES `director` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
