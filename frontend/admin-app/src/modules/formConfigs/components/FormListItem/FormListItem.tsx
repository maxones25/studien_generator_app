import {
  DataListItem,
  DeleteDialog,
  IconButton,
  Link,
  Row,
} from "@modules/core/components";
import { useOpen } from "@modules/core/hooks";
import { Close, Delete, MoreTime } from "@mui/icons-material";
import {
  Badge,
  Checkbox,
  Chip,
  Collapse,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  useActivateForm,
  useDeactivateForm,
  useRemoveGroupForm,
  useSetFormTimeDependent,
  useSetFormTimeIndependent,
} from "@modules/formConfigs/hooks";
import { Config } from "@modules/formConfigs/types";
import { FormSchedulesCard } from "..";

export interface FormListItemProps {
  form: Config;
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
      <DataListItem
        data-testid={`form config ${form.form.name} ${form.type}`}
        item={form}
        divider={!isLast}
        disablePadding={false}
      >
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
          <ListItemText>
            <Link testId="open form" to={`../../forms/${form.form.id}`}>
              {form.form.name}
            </Link>
          </ListItemText>
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
            <Badge badgeContent={form.schedules?.length} color="primary">
              <IconButton
                testId="open schedules button"
                Icon={subcard.isOpen ? <Close /> : <MoreTime />}
                onClick={subcard.toggle}
                disabled={!isTimeDependent}
              />
            </Badge>
          </Tooltip>
        </Row>
      </DataListItem>
      <Collapse in={subcard.isOpen}>
        <FormSchedulesCard form={form} />
      </Collapse>
    </>
  );
};
