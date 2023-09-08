import {
  DataDialog,
  DataList,
  DataListItem,
  EditableListItem,
  IconButton,
  Page,
  Text,
} from "@modules/core/components";
import { useFormData, useNavigationHelper } from "@modules/core/hooks";
import { DeleteFormForm } from "@modules/forms/components";
import {
  useCreateForm,
  useDeleteForm,
  useGetForms,
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
  const deleteGroupData = useFormData<FormFormData>();
  const getGroups = useGetForms();
  const createForm = useCreateForm();
  const deleteGroup = useDeleteForm();
  const formData = useFormData<FormFormData>();

  const handleCreate = () => {
    if (formData.data) {
      createForm.mutate(formData.data);
      formData.reset();
    }
  };

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
          onClick={formData.handleSet({ name: "" })}
          Icon={<Add />}
        />
      </Toolbar>
      {formData.hasData && (
        <EditableListItem
        record="form"
          onCancel={formData.reset}
          onChange={(name) => formData.set({ name })}
          onSave={handleCreate}
          inputProps={{
            placeholder: t("enter value", { value: t("number") }),
          }}
        />
      )}
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
            onDelete={deleteGroupData.handleSet(form)}
          >
            <ListItemButton
              onClick={navigate.handle(`${form.id}`)}
              selected={formId === form.id}
            >
              <ListItemText>{form.name}</ListItemText>
            </ListItemButton>
          </DataListItem>
        )}
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
