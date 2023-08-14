import {
  Column,
  DataList,
  IconButton,
  Row,
  Text,
} from "@modules/core/components";
import { useMenuAnchor } from "@modules/core/hooks";
import { useGetForms } from "@modules/forms/hooks";
import { FormConfigType } from "@modules/forms/types";
import { useAddGroupForm, useGetGroupForms } from "@modules/groups/hooks";
import { useGroupId } from "@modules/navigation/hooks";
import { Add } from "@mui/icons-material";
import { Divider, Menu, MenuItem } from "@mui/material";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FormListItem } from "..";

export interface FormsCardProps {}

export const FormsCard: React.FC<FormsCardProps> = () => {
  const { t } = useTranslation();
  const groupId = useGroupId();
  const getGroupForms = useGetGroupForms({ groupId: groupId! });
  const addGroupForm = useAddGroupForm();
  const menuAnchor = useMenuAnchor();
  const getForms = useGetForms();

  const handleAddForm = (formId: string) => () => {
    addGroupForm.mutate({
      isActive: false,
      groupId: groupId!,
      type: FormConfigType.TimeIndependent,
      formId,
    });
    menuAnchor.close();
  };

  const availableForms = useMemo(() => {
    if (!getForms.data) return [];
    if (!getGroupForms.data) return [];
    return getForms.data.filter(
      (form) =>
        !getGroupForms.data.some((groupForm) => form.id === groupForm.form.id)
    );
  }, [getForms.data, getGroupForms.data]);

  const hasForms = availableForms.length > 0;

  return (
    <Column flex={1} boxShadow={4}>
      <Row p={2} justifyContent="space-between">
        <Text>{t("forms")}</Text>
        <IconButton
          testId="add group form button"
          Icon={<Add />}
          onClick={menuAnchor.open}
          disabled={!hasForms}
          tooltipProps={{
            title: hasForms
              ? t("add data", { data: t("form") })
              : t("no records found", { records: t("forms") }),
          }}
        />
        <Menu
          open={menuAnchor.isOpen}
          anchorEl={menuAnchor.element}
          onClose={menuAnchor.close}
        >
          {availableForms.map((form) => (
            <MenuItem key={form.id} onClick={handleAddForm(form.id)}>
              {form.name}
            </MenuItem>
          ))}
        </Menu>
      </Row>
      <Divider />
      <Column flex={1} p={2} pt={1} pb={1} sx={{ overflowY: "scroll" }}>
        <DataList
          client={getGroupForms}
          errorText="error"
          noDataText="no data"
          renderItem={(form, { isLast }) => (
            <FormListItem key={form.id} form={form} isLast={isLast} />
          )}
        />
      </Column>
    </Column>
  );
};
