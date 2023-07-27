import { DataDialog, DataList, DataListItem, IconButton, Page, Text } from "@modules/core/components";
import { useFormData, useNavigationHelper } from "@modules/core/hooks";
import { FormForm } from "@modules/forms/components";
import {
  useCreateForm,
  useDeleteForm,
  useGetForms,
  useUpdateForm,
} from "@modules/forms/hooks";
import { FormFormData } from "@modules/forms/types";
import { Add } from "@mui/icons-material";
import { ListItemButton, ListItemText, Toolbar } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface FormsPageProps {}

const FormsPage: React.FC<FormsPageProps> = () => {
  const { t } = useTranslation();
  const navigate = useNavigationHelper();
  const editGroupData = useFormData<FormFormData>();
  const deleteGroupData = useFormData<FormFormData>();
  const getGroups = useGetForms();
  const createGroup = useCreateForm();
  const updateGroup = useUpdateForm();
  const deleteGroup = useDeleteForm();

  return (
    <Page testId="forms page" width={200} boxShadow={6} zIndex={900}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", pl: 2 }}>
        <Text variant="h6">{t("groups")}</Text>
        <IconButton
          testId="create group button"
          onClick={editGroupData.handleSet({ name: "" })}
          Icon={<Add />}
        />
      </Toolbar>
      <DataList
        client={getGroups}
        disablePadding
        errorText={t("fetch error data", { data: t("groups") })}
        noDataText={t("no data found", { data: t("groups") })}
        renderItem={(group, { isLast }) => (
          <DataListItem
            key={group.id}
            divider={!isLast}
            item={group}
            onUpdate={editGroupData.handleSet(group)}
            onDelete={deleteGroupData.handleSet(group)}
          >
            <ListItemButton
              onClick={navigate.handle(`${group.id}`)}
              // selected={groupId === group.id}
            >
              <ListItemText>{group.name}</ListItemText>
            </ListItemButton>
          </DataListItem>
        )}
      />
      <DataDialog
        Form={FormForm}
        client={editGroupData}
        createTitle={t("create data", { data: t("group") })}
        updateTitle={t("update data", { data: t("group") })}
        onCreate={createGroup.mutateAsync}
        onUpdate={updateGroup.mutateAsync}
      />

      {/* <DataDialog
        Form={DeleteGroupForm}
        client={deleteGroupData}
        mode="delete"
        deleteTitle={t("delete data", { data: t("group") })}
        onDelete={deleteGroup.mutateAsync}
      /> */}
    </Page>
  );
};

export default FormsPage;
