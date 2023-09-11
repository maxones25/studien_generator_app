import {
  Column,
  DataList,
  DeleteDialog,
  IconButton,
  OnlyAdmin,
  Row,
  Text,
} from "@modules/core/components";
import { useFormData } from "@modules/core/hooks";
import { FieldForm } from "@modules/fields/components";
import {
  useAddField,
  useDeleteField,
  useGetFields,
  useUpdateField,
} from "@modules/fields/hooks";
import { FieldFormData } from "@modules/fields/types";
import { Add, Delete } from "@mui/icons-material";
import {
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  ListItem,
  ListItemButton,
} from "@mui/material";
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
          testId="open field dialog"
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
          <ListItem
            data-testid={`field item ${field.name}`}
            key={field.id}
            secondaryAction={
              <OnlyAdmin>
                {({ disabled }) => (
                  <IconButton
                    testId={`delete field ${field.id}`}
                    Icon={<Delete />}
                    onClick={deleteData.handleSet(field)}
                    disabled={disabled}
                    tooltipProps={{
                      title: t("delete record", { record: t("field") }),
                    }}
                  />
                )}
              </OnlyAdmin>
            }
            divider={!isLast}
          >
            <ListItemButton onClick={editData.handleSet(field)}>
              <Text sx={{ minWidth: 150 }}>{field.name}</Text>
              <Chip
                data-testid="field type"
                label={t(field.type)}
                color="primary"
                variant="filled"
                size="small"
                sx={{ ml: 1 }}
              />
            </ListItemButton>
          </ListItem>
        )}
      />
      <Dialog open={editData.hasData} onClose={editData.reset}>
        <DialogTitle>
          {editData.isNew
            ? t("create record", { record: t("field") })
            : editData.data?.name}
        </DialogTitle>
        <DialogContent>
          <FieldForm onSubmit={handeSave} values={editData.data} />
        </DialogContent>
      </Dialog>
      <DeleteDialog
        record="field"
        open={deleteData.hasData}
        target={deleteData.data?.name ?? ""}
        onCancel={deleteData.reset}
        onConfirm={() =>
          deleteField.mutateAsync(deleteData.data!).then(() => {
            deleteData.reset();
          })
        }
      />
    </Column>
  );
};
