export type Message = {
  id: string;
  content: string;
  sentAt: string;
  director: {
    id: string;
    firstName: string;
    lastName: string;
  } | null;
  participant: {
    id: string;
    number: string;
  } | null;
};
