# Plopfile Dokumentation

Das vorliegende Skript verwendet [Plop](https://plopjs.com/), um den Prozess der Komponentenerstellung in unserem Codebase zu automatisieren. Es definiert mehrere Generatoren, die jeweils eine bestimmte Art von Datei oder Dateisatz erstellen.

## Generatoren

Die Generatoren sind:

### 1. ComponentGenerator

Erzeugt eine neue Komponente in einem spezifischen Modul. Es erstellt eine neue .tsx-Datei für die Komponente und fügt einen Import-Statement zur index.ts-Datei des Moduls hinzu.

Verwendung:

```console
npx plop c
```
oder
```console
npx plop component
```

### 2. PageGenerator

Erzeugt eine neue Seitenkomponente. Es erstellt eine neue .tsx-Datei für die Seite.

Verwendung:

```console
npx plop p
```
oder
```console
npx plop page
```

### 3. HookGenerator

Erzeugt einen neuen Hook in einem spezifischen Modul. Es erstellt eine neue .ts-Datei für den Hook und fügt einen Import-Statement zur index.ts-Datei des Moduls hinzu.

Verwendung:

```console
npx plop h
```
oder
```console
npx plop hook
```

### 4. TypeGenerator

Erzeugt einen neuen Typ oder eine Schnittstelle in einem spezifischen Modul. Es erstellt eine neue .ts-Datei für den Typ oder die Schnittstelle und fügt einen Import-Statement zur index.ts-Datei des Moduls hinzu.

Verwendung:

```console
npx plop t
```
oder
```console
npx plop type
```

### 5. UtilsGenerator

Erzeugt ein neues Dienstprogrammpaket in einem spezifischen Modul. Es erstellt eine neue .ts-Datei für das Dienstprogramm und fügt einen Import-Statement zur index.ts-Datei des Moduls hinzu.

Verwendung:

```console
npx plop u
```
oder
```console
npx plop util
```


### 6. ContextGenerator

Erzeugt einen neuen Kontext in einem spezifischen Modul. Es erstellt eine neue .tsx-Datei für den Kontext und fügt einen Import-Statement zur index.ts-Datei des Moduls hinzu.

Verwendung:

```console
npx plop con
```
oder
```console
npx plop context
```

## Module

Die verfügbaren Module sind "core", "auth" und "date" oder weitere Module, welchen dem Modul-Array hinzugefügt werden. Sie können ein Modul auswählen, wenn Sie eine Komponente, einen Hook, einen Typ oder ein Dienstprogrammpaket erstellen.

## Templates

Die Generatoren verwenden Handlebars-Templates (.hbs-Dateien) zur Erzeugung von Dateien. Die Templates befinden sich im Ordner "plop/templates".
