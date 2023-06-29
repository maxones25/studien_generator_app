import { Group } from "@modules/groups/types";

export type Entity = {
  id: string;
  name: string;
  isStudy: boolean;
  groups: Group[];
};
