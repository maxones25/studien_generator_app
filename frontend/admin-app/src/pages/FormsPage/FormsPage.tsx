import {
  DataDialog,
  DataList,
  DataListItem,
  IconButton,
  Page,
  Text,
} from "@modules/core/components";
import { useFormData, useNavigationHelper } from "@modules/core/hooks";
import { DeleteFormForm, FormForm } from "@modules/forms/components";
import {
  useCreateForm,
  useDeleteForm,
  useGetForms,
  useUpdateForm,
} from "@modules/forms/hooks";
import { FormFormData } from "@modules/forms/types";
import { useFormId } from "@modules/navigation/hooks";
import { Add } from "@mui/icons-material";
import { ListItemButton, ListItemText, Toolbar } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface FormsPageProps {}

const FormsPage: React.FC<FormsPageProps> = () => {
  const { t } = useTranslation();
  const navigate = useNavigationHelper();
  const formId = useFormId(false);
  const editGroupData = useFormData<FormFormData>();
  const deleteGroupData = useFormData<FormFormData>();
  const getGroups = useGetForms();
  const createGroup = useCreateForm();
  const updateGroup = useUpdateForm();
  const deleteGroup = useDeleteForm();

  const handleDeleteForm = async (data: FormFormData) => {
    await deleteGroup.mutateAsync(data);
    navigate.to("../forms");
  };

  return (
    <Page testId="forms page" width={200} boxShadow={6} zIndex={900}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", pl: 2 }}>
        <Text variant="h6">{t("forms")}</Text>
        <IconButton
          testId="create group button"
          onClick={editGroupData.handleSet({ name: "" })}
          Icon={<Add />}
        />
      </Toolbar>
      <DataList
        client={getGroups}
        disablePadding
        errorText={t("fetch error data", { data: t("forms") })}
        noDataText={t("no data found", { data: t("forms") })}
        renderItem={(form, { isLast }) => (
          <DataListItem
            key={form.id}
            divider={!isLast}
            item={form}
            onUpdate={editGroupData.handleSet(form)}
            onDelete={deleteGroupData.handleSet(form)}
          >
            <ListItemButton
              onClick={navigate.handle(`${form.id}/pages/1`)}
              selected={formId === form.id}
            >
              <ListItemText>{form.name}</ListItemText>
            </ListItemButton>
          </DataListItem>
        )}
      />
      <DataDialog
        Form={FormForm}
        client={editGroupData}
        createTitle={t("create data", { data: t("form") })}
        updateTitle={t("update data", { data: t("form") })}
        onCreate={createGroup.mutateAsync}
        onUpdate={updateGroup.mutateAsync}
      />
      <DataDialog
        Form={DeleteFormForm}
        client={deleteGroupData}
        mode="delete"
        deleteTitle={t("delete data", { data: t("form") })}
        onDelete={handleDeleteForm}
      />
    </Page>
  );
};

export default FormsPage;
