import { DataListItem, IconButton, Row } from "@modules/core/components";
import { useOpen } from "@modules/core/hooks";
import { FormConfig, FormConfigTypeType } from "@modules/forms/types";
import { useUpdateGroupForm } from "@modules/groups/hooks";
import { Delete, ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Checkbox,
  Chip,
  Collapse,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormSchedulesCard } from "..";

export interface FormListItemProps {
  form: FormConfig;
  isLast: boolean;
}

export const FormListItem: React.FC<FormListItemProps> = ({ form, isLast }) => {
  const { t } = useTranslation();
  const subcard = useOpen();
  const updateGroupForm = useUpdateGroupForm();

  const isTimeDependent = form.type === "TimeDependent";

  const handleChangeType = () => {
    const type: FormConfigTypeType = isTimeDependent
      ? "TimeIndependent"
      : "TimeDependent";
    subcard.close();
    updateGroupForm.mutate({
      id: form.id,
      type,
    });
  };

  const handleChangeIsActive = (
    _: React.ChangeEvent<HTMLInputElement>,
    isActive: boolean
  ) => {
    updateGroupForm.mutate({
      id: form.id,
      isActive,
    });
  };

  return (
    <>
      <DataListItem
        item={form}
        divider={!isLast}
        accordion={
          <IconButton
            testId="expand list item icon button"
            Icon={subcard.isOpen ? <ExpandLess /> : <ExpandMore />}
            onClick={subcard.toggle}
            disabled={!isTimeDependent}
          />
        }
        disablePadding={false}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={form.isActive}
            onChange={handleChangeIsActive}
          />
        </ListItemIcon>
        <Row flex={1} pr={8}>
          <ListItemText>{form.form.name}</ListItemText>
          <Chip
            color={isTimeDependent ? "primary" : "default"}
            onClick={handleChangeType}
            label={t("TimeDependent")}
          />
          <IconButton
            testId="delete form icon button"
            Icon={<Delete />}
            sx={{ ml: 1 }}
          />
        </Row>
      </DataListItem>
      <Collapse in={subcard.isOpen}>
        <FormSchedulesCard form={form} />
      </Collapse>
    </>
  );
};
