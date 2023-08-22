import {
  DataDialog,
  DataList,
  DataListItem,
  Page,
  Text,
} from "@modules/core/components";
import { useFormData, useNavigationHelper } from "@modules/core/hooks";
import { DeleteEntityForm, EntityForm } from "@modules/entities/components";
import {
  useCreateEntity,
  useDeleteEntity,
  useGetEntities,
  useChangeName,
} from "@modules/entities/hooks";
import { EntityFormData } from "@modules/entities/types";
import { useEntityId } from "@modules/navigation/hooks";
import { Add } from "@mui/icons-material";
import {
  IconButton,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface EntitiesPageProps {}

const EntitiesPage: React.FC<EntitiesPageProps> = () => {
  const { t } = useTranslation();
  const entityId = useEntityId();
  const navigate = useNavigationHelper();
  const editData = useFormData<EntityFormData>();
  const deleteData = useFormData<EntityFormData>();
  const getEntities = useGetEntities();
  const createEntity = useCreateEntity();
  const updateEntity = useChangeName();
  const deleteEntity = useDeleteEntity();

  return (
    <Page testId="entities page" width={200} boxShadow={6} zIndex={800}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", pl: 2 }}>
        <Text variant="h6">{t("entities")}</Text>
        <IconButton
          data-testid="create entities button"
          onClick={editData.handleSet({ name: "" })}
        >
          <Add />
        </IconButton>
      </Toolbar>
      <DataList
        client={getEntities}
        errorText={t("fetch error data", { data: t("entities") })}
        noDataText={t("no data found", { data: t("entities") })}
        renderItem={(entity, { isLast }) => (
          <DataListItem
            key={entity.id}
            item={entity}
            divider={!isLast}
            onDelete={deleteData.set}
            onUpdate={editData.set}
          >
            <ListItemButton
              onClick={navigate.handle(`${entity.id}/fields`)}
              selected={entityId === entity.id}
            >
              <ListItemText>{entity.name}</ListItemText>
            </ListItemButton>
          </DataListItem>
        )}
      />
      <DataDialog
        client={editData}
        Form={EntityForm}
        createTitle={t("create data", { data: t("entity") })}
        updateTitle={t("update data", { data: t("entity") })}
        onCreate={createEntity.mutateAsync}
        onUpdate={updateEntity.mutateAsync}
      />
      <DataDialog
        client={deleteData}
        Form={DeleteEntityForm}
        mode="delete"
        deleteTitle={t("delete data", { data: t("entity") })}
        onDelete={deleteEntity.mutateAsync}
      />
    </Page>
  );
};

export default EntitiesPage;
