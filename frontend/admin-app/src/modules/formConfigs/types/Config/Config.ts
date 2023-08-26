import { ConfigTypeType, Schedule } from "..";

export type Config = {
  id: string;
  isActive: boolean;
  type: ConfigTypeType;
  form: {
    id: string;
    name: string;
  };
  schedules: Schedule[] | null;
};
