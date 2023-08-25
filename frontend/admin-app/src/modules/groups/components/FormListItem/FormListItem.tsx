import {
  DataListItem,
  DeleteDialog,
  IconButton,
  Row,
} from "@modules/core/components";
import { useOpen } from "@modules/core/hooks";
import { FormConfig } from "@modules/forms/types";
import { Close, Delete, MoreTime } from "@mui/icons-material";
import {
  Checkbox,
  Chip,
  Collapse,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormSchedulesCard } from "..";
import {
  useActivateForm,
  useDeactivateForm,
  useRemoveGroupForm,
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
  const removeGroupForm = useRemoveGroupForm();
  const deleteDialog = useOpen();

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

  const handleRemoveGroupForm = () => {
    removeGroupForm.mutateAsync(form).then(() => {
      deleteDialog.close();
    });
  };

  return (
    <>
      <DataListItem item={form} divider={!isLast} disablePadding={false}>
        <ListItemIcon>
          <Tooltip
            title={t(form.isActive ? "deactivate record" : "activate record", {
              record: t("form"),
            })}
          >
            <Checkbox
              edge="start"
              checked={form.isActive}
              onChange={handleChangeIsActive}
            />
          </Tooltip>
        </ListItemIcon>
        <Row flex={1}>
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
            onClick={deleteDialog.open}
            tooltipProps={{
              title: t("delete record", {
                record: t("form"),
              }),
            }}
          />
          <DeleteDialog
            record="form"
            open={deleteDialog.isOpen}
            target={form.form.name}
            onCancel={deleteDialog.close}
            onConfirm={handleRemoveGroupForm}
            isLoading={removeGroupForm.isLoading}
          />
          <Tooltip
            title={
              subcard.isOpen
                ? t("close view", { view: t("schedules") })
                : t("add record", { record: t("schedules") })
            }
          >
            <IconButton
              testId="open schedules button"
              Icon={subcard.isOpen ? <Close /> : <MoreTime />}
              onClick={subcard.toggle}
              disabled={!isTimeDependent}
            />
          </Tooltip>
        </Row>
      </DataListItem>
      <Collapse in={subcard.isOpen}>
        <FormSchedulesCard form={form} isActive={subcard.isOpen} />
      </Collapse>
    </>
  );
};
