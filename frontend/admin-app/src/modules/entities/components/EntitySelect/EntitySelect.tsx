import { Select, SelectProps } from "@modules/core/components";
import { useGetEntities } from "@modules/entities/hooks";
import React from "react";

export interface EntitySelectProps
  extends Omit<SelectProps, "options" | "name"> {
  name?: string;
}

export const EntitySelect: React.FC<EntitySelectProps> = ({
  name = "entity-select",
  ...props
}) => {
  const getEntities = useGetEntities();

  const options =
    getEntities.data?.map((entity) => ({
      label: entity.name,
      value: entity.id,
    })) ?? [];

  return (
    <Select
      name={name}
      options={[{ label: "-", value: null }, ...options]}
      {...props}
    />
  );
};
