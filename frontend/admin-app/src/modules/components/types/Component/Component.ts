import { EntityFieldType } from "@modules/fields/types";

export type Component = {
  name: string;
  entityFields: EntityFieldType[];
  attributes: {
    name: string;
    required: boolean;
  }[];
};
