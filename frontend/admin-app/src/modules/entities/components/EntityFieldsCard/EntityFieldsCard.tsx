import {
  Column,
  DataDialog,
  DataList,
  DataListItem,
  IconButton,
  Row,
  Text,
} from "@modules/core/components";
import { useFormData } from "@modules/core/hooks";
import { DeleteFieldForm, FieldForm } from "@modules/fields/components";
import {
  useAddField,
  useDeleteField,
  useGetFields,
  useUpdateField,
} from "@modules/fields/hooks";
import { FieldFormData } from "@modules/fields/types";
import { Add } from "@mui/icons-material";
import { Chip, Divider, Drawer, ListItemButton } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface EntityFieldsCardProps {}

export const EntityFieldsCard: React.FC<EntityFieldsCardProps> = () => {
  const { t } = useTranslation();
  const editData = useFormData<FieldFormData>();
  const deleteData = useFormData<FieldFormData>();
  const getFields = useGetFields();
  const createField = useAddField();
  const updateField = useUpdateField();
  const deleteField = useDeleteField();

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
    <Column boxShadow={4} flex={1}>
      <Row m={2} mt={1} mb={1} justifyContent="space-between">
        <Text>{t("fields")}</Text>
        <IconButton
          testId="add field group button"
          onClick={editData.handleSet({
            name: "",
            type: "Text",
          })}
          tooltipProps={{
            title: t("add data", { data: t("field") }),
          }}
          Icon={<Add />}
        />
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
  );
};
