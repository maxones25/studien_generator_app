import { EntityFieldType } from "@modules/fields/types";

export type Component = {
  name: string;
  entityFields: EntityFieldType[];
  attributes: Record<
    string,
    {
      name: string;
      type: string;
      required: boolean;
    }
  >;
};
