export type Participant = {
  id: string;
  number: string;
  chat: {
    id: string;
  };
  group: {
    id: string;
    name: string;
  } | null;
  startedAt?: string;
  endedAt?: string;
};

export type MinimalParticipant = {
  id: string;
  number: string;
};
