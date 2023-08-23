import {
  Column,
  DataList,
  DataListItem,
  IconButton,
  Row,
  Text,
} from "@modules/core/components";
import { useNavigationHelper } from "@modules/core/hooks";
import { useGetEntityForms } from "@modules/entities/hooks";
import { Entity } from "@modules/entities/types";
import { useCreateForm } from "@modules/forms/hooks";
import { Add } from "@mui/icons-material";
import { Chip, Divider, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface EntityFormsCardProps {
  entity: Entity;
}

export const EntityFormsCard: React.FC<EntityFormsCardProps> = ({ entity }) => {
  const { t } = useTranslation();
  const navigate = useNavigationHelper();
  const createForm = useCreateForm();
  const getForms = useGetEntityForms();

  const handleCreateForm = async () => {
    const { id, name } = entity;
    const formId = await createForm.mutateAsync({
      name,
      entities: [
        {
          entityId: id,
          name,
        },
      ],
    });
    openForm(formId);
  };

  const openForm = (formId: string) => {
    navigate.to(`../../forms/${formId}`);
  };

  return (
    <Column boxShadow={4} flex={1} ml={2} alignSelf="stretch">
      <Row m={2} mt={1} mb={1} justifyContent="space-between">
        <Text>{t("forms")}</Text>
        <IconButton
          testId="add field group button"
          onClick={handleCreateForm}
          tooltipProps={{
            title: t("add data", { data: t("field") }),
          }}
          Icon={<Add />}
        />
      </Row>
      <Divider />
      <DataList
        client={getForms}
        errorText="error"
        noDataText="no data"
        renderItem={(form, { isLast }) => (
          <DataListItem key={form.id} item={form} divider={!isLast}>
            <ListItemButton onClick={() => openForm(form.id)}>
              <ListItemText
                primary={form.name}
                secondary={form.formEntities
                  .map((entity) => entity.name)
                  .join(", ")}
              />
            </ListItemButton>
          </DataListItem>
        )}
      />
    </Column>
  );
};
