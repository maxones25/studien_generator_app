# Studien Generator App

## Projektbeschreibung

Dieses Projekt zielt darauf ab, eine generische Anwendung für wissenschaftliche Studien zu entwickeln. Diese App wird in Zusammenarbeit mit dem Zentralinstitut für Seelische Gesundheit (ZI) in Mannheim erstellt und soll dazu dienen, das Management von Studien sowie die Erfassung und Verwaltung von Teilnehmerdaten zu ermöglichen.

## Technologie Stack

Die App wird mit folgenden Technologien entwickelt:

- Frontend: React (PWA)
- Backend: Nest.js
- Datenbank: MySQL

## Anwendungsfunktionen

Die App besteht aus zwei Teilen:

1. **Admin-App:** Dient der Administration und Verwaltung der Studien. Hier können neue Studien erstellt, bestehende Studien bearbeitet und Teilnehmer verwaltet werden.

2. **Studien-App:** Hier können die Teilnehmer ihre Daten erfassen. Die Teilnehmer können sich für Studien anmelden, ihre persönlichen Daten eingeben und ihre Studiendaten einreichen.

## Getting started

Builden der Anwendung

```console
docker-compose -f "prod-docker-compose.yaml" build --no-cache
```

Starten der Anwendung

```console
docker-compose -f "prod-docker-compose.yaml" up -d
```

Ausführen der Datenbank Migrations

```console
docker-compose -f "prod-docker-compose.yaml" exec admin-backend npm run db:migration:run
```

## Development

### Starten der Datenbank

Starten des lokalen Datenbankservers

```console
docker-compose -f "dev-docker-compose.yaml" up -d
```

### Starten des Backends

Navigiere in den Order backend

```console
cd backend
```

Installiere alle npm Pakete

```console
npm install
```

Starte den lokalen Backendserver

```console
npm run start:dev
```

### Starten der Admin App (Frontend)

Navigiere in den Order frontend/admin-app

```console
cd frontend/admin-app
```

Die App benötigt folgende Umgebungsvariablen:

VITE_API_URI: URI des Admin-Backends

Installiere alle npm Pakete

```console
npm install
```

Starte die Anwendung

```console
npm start
```

### Starten der Studien App (Frontend)

Navigiere in den Order frontend/study-app

```console
cd frontend/study-app
```

Die App benötigt folgende Umgebungsvariablen:

VITE_API_URI: URI des Study-Backends

Installiere alle npm Pakete

```console
npm install
```

Starte die Anwendung

```console
npm start
```

### Code Generierung

Im Frontend wird der Code Generator "plop.js" eingesetzt.

[Plop Dokumentation](documentation/plop.md)

## Testen

### Integration Tests

Navigiere in den Ordner backend

```console
cd backend
```

Teste die Endpoints des Admin-Backends

```console
npm run test:admin:integration
```

Teste die Endpoints des Study-Backends

```console
npm run test:study:integration
```

### End To End Tests

Starten der Anwendung

```console
docker-compose -f "prod-docker-compose.yaml" up -d
```

#### Cypress

Navigiere in den Ordner test/cypress

```console
cd tests/cypress
```

Teste die Admin App

```console
npm run test:admin-app
```

Teste die Studien App

```console
npm run test:study-app
```

#### Puppeteer

Navigiere in den Ordner test/puppeteer

```console
cd tests/puppeteer
```

Teste die Studien App

```console
npm run test:study-app
```
