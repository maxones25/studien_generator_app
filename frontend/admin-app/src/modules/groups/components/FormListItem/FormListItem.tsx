import { DataListItem, IconButton, Row } from "@modules/core/components";
import { useOpen } from "@modules/core/hooks";
import { FormConfig } from "@modules/forms/types";
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
import {
  useActivateForm,
  useDeactivateForm,
  useSetFormTimeDependent,
  useSetFormTimeIndependent,
} from "@modules/formConfigs/hooks";

export interface FormListItemProps {
  form: FormConfig;
  isLast: boolean;
}

export const FormListItem: React.FC<FormListItemProps> = ({ form, isLast }) => {
  const { t } = useTranslation();
  const subcard = useOpen();
  const setFormTimeDependent = useSetFormTimeDependent();
  const setFormTimeIndependent = useSetFormTimeIndependent();
  const activateForm = useActivateForm();
  const deactivateForm = useDeactivateForm();

  const isTimeDependent = form.type === "TimeDependent";

  const handleChangeType = () => {
    if (isTimeDependent) {
      setFormTimeIndependent.mutate(form);
    } else {
      setFormTimeDependent.mutate(form);
    }
    subcard.close();
  };

  const handleChangeIsActive = (
    _: React.ChangeEvent<HTMLInputElement>,
    isActive: boolean
  ) => {
    if (isActive) {
      activateForm.mutate(form);
    } else {
      deactivateForm.mutate(form);
    }
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
