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
  useUpdateEntity,
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

export interface EntitiesPageProps {}

const EntitiesPage: React.FC<EntitiesPageProps> = () => {
  const entityId = useEntityId();
  const navigate = useNavigationHelper();
  const editData = useFormData<EntityFormData>();
  const deleteData = useFormData<EntityFormData>();
  const getEntities = useGetEntities();
  const createEntity = useCreateEntity();
  const updateEntity = useUpdateEntity();
  const deleteEntity = useDeleteEntity();

  return (
    <Page testId="entities page" ml={1} width={200} boxShadow={4}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", pl: 2 }}>
        <Text variant="h6">Entities</Text>
        <IconButton
          data-testid="create entities button"
          onClick={editData.handleSet({ name: "" })}
        >
          <Add />
        </IconButton>
      </Toolbar>
      <DataList
        client={getEntities}
        noDataText="no data"
        errorText="error"
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
        createTitle="create entity"
        updateTitle="update entity"
        onCreate={createEntity.mutateAsync}
        onUpdate={updateEntity.mutateAsync}
      />
      <DataDialog
        client={deleteData}
        Form={DeleteEntityForm}
        mode="delete"
        deleteTitle="delete entity"
        onDelete={deleteEntity.mutateAsync}
      />
    </Page>
  );
};

export default EntitiesPage;
