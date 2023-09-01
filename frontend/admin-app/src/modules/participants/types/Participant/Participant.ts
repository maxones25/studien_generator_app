export type Participant = {
  id: string;
  number: string;
  deletedAt: string | null;
  isDeleted: boolean;
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
