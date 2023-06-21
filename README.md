# Studien Generator App

## Getting started

Builden der Anwendung

```console
docker-compose -f "prod-docker-compose.yaml" build --no-cache
```

Starten der Anwendung

```console
docker-compose -f "prod-docker-compose.yaml" up -d
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

Starte den lokalen Backendserver

```console
npm run start:dev
```

### Starten der Admin App (Frontend)

Navigiere in den Order frontend/admin-app

```console
cd frontend/admin-app
```

Installiere alle npm Pakete

```console
npm install
```

Starte die Anwendung

```console
npm start
```

### Starten der Study App (Frontend)

Navigiere in den Order frontend/study-app

```console
cd frontend/study-app
```

Installiere alle npm Pakete

```console
npm install
```

Starte die Anwendung

```console
npm start
```