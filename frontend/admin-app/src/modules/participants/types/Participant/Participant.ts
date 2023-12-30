export type Participant = {
  id: string;
  number: string;
  deletedAt: string | null;
  isDeleted: boolean;
  chat: {
    id: string;
  };
  study: {
    id: string,
    name: string,
  }
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
