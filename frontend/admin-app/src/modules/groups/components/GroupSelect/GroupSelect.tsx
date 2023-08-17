import { Select, SelectOption, SelectProps } from "@modules/core/components";
import { useGetGroups } from "@modules/groups/hooks";
import { Group } from "@modules/groups/types";
import { CircularProgress, SelectChangeEvent } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface GroupSelectProps
  extends Omit<SelectProps, "label" | "options" | "name" | "onChange"> {
  onChange: (group: Group) => void;
}

export const GroupSelect: React.FC<GroupSelectProps> = ({
  onChange,
  ...props
}) => {
  const { t } = useTranslation();
  const getGroups = useGetGroups();

  if (getGroups.isLoading) {
    return <CircularProgress />;
  }

  const options: SelectOption[] =
    getGroups.data?.map((group) => ({ label: group.name, value: group.id })) ??
    [];

  const handleSelect = (e: SelectChangeEvent<unknown>) => {
    const groupId = e.target.value;
    const group = getGroups.data?.find((group) => group.id === groupId);
    if (group) {
      onChange(group);
    }
  };

  return (
    <Select
      {...props}
      label={t("group")}
      name="groups"
      options={options}
      onChange={handleSelect}
    />
  );
};
