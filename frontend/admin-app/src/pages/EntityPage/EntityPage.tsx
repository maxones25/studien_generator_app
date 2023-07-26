import {
  Button,
  Column,
  DataDialog,
  DataList,
  DataListItem,
  Page,
  Row,
  Text,
} from "@modules/core/components";
import { useFormData } from "@modules/core/hooks";
import { useGetEntity } from "@modules/entities/hooks";
import { DeleteFieldForm, FieldForm } from "@modules/fields/components";
import {
  useCreateField,
  useDeleteField,
  useGetFields,
  useUpdateField,
} from "@modules/fields/hooks";
import { FieldFormData } from "@modules/fields/types";
import { useGroupId } from "@modules/navigation/hooks";
import { Chip, Divider, Drawer, ListItemButton, Toolbar } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface EntityPageProps {}

const EntityPage: React.FC<EntityPageProps> = () => {
  const { t } = useTranslation();
  const getEntity = useGetEntity();
  const editData = useFormData<FieldFormData>();
  const deleteData = useFormData<FieldFormData>();
  const getFields = useGetFields();
  const createField = useCreateField();
  const updateField = useUpdateField();
  const deleteField = useDeleteField();
  const groupId = useGroupId();

  const handeSave = (data: FieldFormData) => {
    if (data.id) {
      updateField.mutateAsync(data).then(() => {
        editData.reset();
      });
    } else {
      createField.mutateAsync(data).then(() => {
        editData.reset();
      });
    }
  };

  return (
    <Page testId="entity page" ml={1} flex={1}>
      <Toolbar>
        <Text variant="h6">{getEntity.data?.name}</Text>
      </Toolbar>
      <Column mt={1}>
        <Row m={2} mt={1} justifyContent="space-between">
          <Text>Fields</Text>
          <Button
            testId="add field group button"
            onClick={editData.handleSet({
              name: "",
              type: "Text",
              groupId: null,
            })}
            sx={{ ml: 1 }}
          >
            {t("add data", { data: t("field") })}
          </Button>
        </Row>
        <Divider />
        <DataList
          client={getFields}
          errorText={t("fetch error data", { data: t("fields") })}
          noDataText={t("no data found", { data: t("fields") })}
          renderItem={(field, { isLast }) => (
            <DataListItem
              key={field.id}
              item={field}
              onDelete={deleteData.handleSet(field)}
              divider={!isLast}
            >
              <ListItemButton onClick={editData.handleSet(field)}>
                <Text sx={{ width: 100 }}>{field.name}</Text>
                <Chip
                  label={field.type}
                  color="primary"
                  variant="filled"
                  size="small"
                  sx={{ ml: 1 }}
                />
              </ListItemButton>
            </DataListItem>
          )}
        />
        <Drawer
          open={editData.hasData}
          variant="temporary"
          anchor="right"
          onClose={editData.reset}
        >
          <FieldForm
            onSubmit={handeSave}
            isNew={editData.isNew}
            values={editData.data}
            formProps={{ p: 1 }}
            groupId={groupId!}
          />
        </Drawer>
        <DataDialog
          Form={DeleteFieldForm}
          mode="delete"
          deleteTitle={t("delete data", { data: t("field") })}
          client={deleteData}
          onDelete={deleteField.mutateAsync}
        />
      </Column>
    </Page>
  );
};

export default EntityPage;
