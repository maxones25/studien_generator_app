### Director Management

**Entitäten**

- Director

**Aggregates**

- Director
  - root: Director

### Study Management

**Entitäten**

- Studies
- StudyAttributes
- StudyMembers
- Appointments

**Aggregates**

- Studies
  - root: Studies
  - enthalten:
    - StudyAttributes
- Members
  - root: StudyMembers
- Appointments
  - root: Appointments

### Group Management

Entitäten:

- Groups
- Participants
- ParticipantAttributes
- Tasks
- FormConfigs
- FormSchedules

**Aggregates**

- Groups
  - root: Groups

- Participants
  - root: Participants
  - enthalten:
    - ParticipantAttributes

- Task
  - root: Tasks

- Forms
  - root: FormConfigs
  - enthalten:
    - FormSchedules

### Formulardefinition

**Entitäten**

- Forms
- FormPages
- FormComponents
- FormFields
- FormComponentAttributes
- FormEntities

**Aggregates**

- Formular
  - root: Forms
  - enthalten
    - FormPages
    - FormEntities
    
- FormularKomponente
  - root: FormComponents
  - enthalten
    - FormFields
    - FormComponentAttributes

### Datenentitäten Management

**Entitäten**

- Entities
- EntityFields

**Aggregates**

- Datenentität
  - root: Entities
  - enthalten
    - EntityFields

### Kommunikationsmanagement

**Entitäten**

- Chats
- ChatMessages

**Aggregates**

- Chat
  - root: Chats
  - enthalten:
    - ChatMessages

### Datenmanagement

**Entitäten**

- Records
- RecordFields

**Aggregates**

- Datensatz
  - root: Records
  - enthalten:
    - RecordFields
