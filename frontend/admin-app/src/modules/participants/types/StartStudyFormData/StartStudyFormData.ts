import { Participant } from "..";

export type StartStudyFormData = {
  participant: Participant;
  startDate: string;
  configs: {
    id: string;
    schedules?: {
      id: string;
      times: string[];
    }[];
  }[];
};
