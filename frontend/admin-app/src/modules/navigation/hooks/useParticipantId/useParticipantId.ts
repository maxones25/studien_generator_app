import { usePathParam } from "..";

export const useParticipantId = (required = true) =>
  usePathParam("participantId", required);
