import { Select, SelectProps } from "@modules/core/components";
import { useGetParticipants } from "@modules/participants/hooks";
import React from "react";

export interface ParticipantSelectProps
  extends Omit<SelectProps, "options" | "name"> {
  name?: string;
}

export const ParticipantSelect: React.FC<ParticipantSelectProps> = ({
  name = "participant-select",
  ...props
}) => {
  const getItems = useGetParticipants();

  const options =
    getItems.data?.map((item) => ({
      label: item.number,
      value: item.id,
    })) ?? [];

  return (
    <Select
      name={name}
      options={[{ label: "-", value: null }, ...options]}
      {...props}
    />
  );
};
