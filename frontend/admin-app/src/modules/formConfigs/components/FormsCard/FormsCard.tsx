import {
  Column,
  DataList,
  IconButton,
  Row,
  Text,
  TooltipGuard,
} from "@modules/core/components";
import { useMenuAnchor } from "@modules/core/hooks";
import {
  useAddGroupForm,
  useGetGroupForms,
  useGetNonGroupForms,
} from "@modules/formConfigs/hooks";
import { useGroupId } from "@modules/navigation/hooks";
import { Add } from "@mui/icons-material";
import { Divider, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormListItem } from "..";

export interface FormsCardProps {}

export const FormsCard: React.FC<FormsCardProps> = () => {
  const { t } = useTranslation();
  const groupId = useGroupId();
  const getGroupForms = useGetGroupForms({ groupId: groupId! });
  const addGroupForm = useAddGroupForm();
  const menuAnchor = useMenuAnchor();
  const getNonGroupForms = useGetNonGroupForms();

  const handleAddForm = (formId: string) => () => {
    addGroupForm.mutate({
      groupId: groupId!,
      formId,
    });
    menuAnchor.close();
  };

  const availableForms = getNonGroupForms.data ?? [];

  const hasForms = availableForms.length > 0;

  return (
    <Column flex={1} boxShadow={4}>
      <Row p={2} justifyContent="space-between">
        <Text>{t("forms")}</Text>
        <TooltipGuard
          validate={{
            "all forms added": !hasForms,
          }}
        >
          {(disabled) => (
            <IconButton
              testId="add group form button"
              Icon={<Add />}
              onClick={menuAnchor.open}
              disabled={disabled}
              tooltipProps={{
                title: t("add data", { data: t("form") }),
              }}
            />
          )}
        </TooltipGuard>
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
