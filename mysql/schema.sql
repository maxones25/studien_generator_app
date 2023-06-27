-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Erstellungszeit: 27. Jun 2023 um 15:44
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
-- Tabellenstruktur für Tabelle `abstract_entity`
--

CREATE TABLE `abstract_entity` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `studyId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `concrete_entity`
--

CREATE TABLE `concrete_entity` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `studyId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `groupId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `abstractEntityId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `director`
--

CREATE TABLE `director` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `entity_field`
--

CREATE TABLE `entity_field` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abtractEntityId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `concreteEntityId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `abstractEntityId` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `group`
--

CREATE TABLE `group` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `studyId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `participant`
--

CREATE TABLE `participant` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
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
-- Indizes für die Tabelle `abstract_entity`
--
ALTER TABLE `abstract_entity`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_name_for_study` (`name`,`studyId`),
  ADD KEY `FK_d5d5fe7cdd2f5c4634c9f144ab5` (`studyId`);

--
-- Indizes für die Tabelle `concrete_entity`
--
ALTER TABLE `concrete_entity`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_entity_for_group` (`abstractEntityId`,`groupId`),
  ADD UNIQUE KEY `unique_entity_for_study` (`abstractEntityId`,`studyId`),
  ADD KEY `FK_abcdb51ad91b394e2d2a29aaedf` (`studyId`),
  ADD KEY `FK_d110c731c925c7b7d3558295262` (`groupId`);

--
-- Indizes für die Tabelle `director`
--
ALTER TABLE `director`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_ee3063e394bf69b0a6157fdaa6` (`email`);

--
-- Indizes für die Tabelle `entity_field`
--
ALTER TABLE `entity_field`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_name_for_entity` (`name`,`abtractEntityId`),
  ADD KEY `FK_df5379e31de951ca6af4c59b39c` (`abstractEntityId`),
  ADD KEY `FK_5212593a95d4e84a18904ff1fc9` (`concreteEntityId`);

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
-- Constraints der Tabelle `abstract_entity`
--
ALTER TABLE `abstract_entity`
  ADD CONSTRAINT `FK_d5d5fe7cdd2f5c4634c9f144ab5` FOREIGN KEY (`studyId`) REFERENCES `study` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `concrete_entity`
--
ALTER TABLE `concrete_entity`
  ADD CONSTRAINT `FK_86aa511a06b756b5c4a1a4eb74c` FOREIGN KEY (`abstractEntityId`) REFERENCES `abstract_entity` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_abcdb51ad91b394e2d2a29aaedf` FOREIGN KEY (`studyId`) REFERENCES `study` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_d110c731c925c7b7d3558295262` FOREIGN KEY (`groupId`) REFERENCES `group` (`id`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `entity_field`
--
ALTER TABLE `entity_field`
  ADD CONSTRAINT `FK_5212593a95d4e84a18904ff1fc9` FOREIGN KEY (`concreteEntityId`) REFERENCES `concrete_entity` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_df5379e31de951ca6af4c59b39c` FOREIGN KEY (`abstractEntityId`) REFERENCES `abstract_entity` (`id`) ON DELETE CASCADE;

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
