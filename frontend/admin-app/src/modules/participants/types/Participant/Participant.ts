export type Participant = {
  id: string;
  number: string;
  group: {
    id: string;
    name: string;
  } | null;
  startedAt?: string;
  endedAt?: string;
};
