import {
  DeleteDialog,
  Editable,
  IconButton,
  OnlyAdmin,
  Page,
  Row,
  Text,
} from "@modules/core/components";
import { useNavigationHelper, useOpen } from "@modules/core/hooks";
import {
  EntityFieldsCard,
  EntityFormsCard,
} from "@modules/entities/components";
import {
  useChangeName,
  useDeleteEntity,
  useGetEntity,
} from "@modules/entities/hooks";
import { Delete } from "@mui/icons-material";
import { Divider, LinearProgress, Toolbar } from "@mui/material";
import React from "react";

export interface EntityPageProps {}

const EntityPage: React.FC<EntityPageProps> = () => {
  const getEntity = useGetEntity();
  const updateEntity = useChangeName();
  const deleteDialog = useOpen();
  const deleteEntity = useDeleteEntity();
  const navigate = useNavigationHelper();

  if (!getEntity.data) {
    return <LinearProgress />;
  }

  const entity = getEntity.data!;

  const handleDelete = () => {
    deleteEntity.mutateAsync(entity).then(() => {
      navigate.to("../");
    });
  };

  return (
    <Page testId="entity page" flex={1}>
      <Toolbar sx={{ ml: 2, justifyContent: "space-between" }}>
        <Editable
          defaultText={entity.name}
          onSubmit={(name) => updateEntity.mutate({ id: entity.id, name })}
        >
          <Text variant="h6">{getEntity.data?.name}</Text>
        </Editable>
        <OnlyAdmin>
          {({ disabled }) => (
            <IconButton
              testId="open delete dialog"
              Icon={<Delete />}
              onClick={deleteDialog.open}
              disabled={disabled}
            />
          )}
        </OnlyAdmin>
        <DeleteDialog
          onCancel={deleteDialog.close}
          onConfirm={handleDelete}
          open={deleteDialog.isOpen}
          record="entity"
          target={entity.name}
          isLoading={deleteEntity.isLoading}
        />
      </Toolbar>
      <Divider />
      <Row m={2} alignItems="stretch">
        <EntityFieldsCard />
        <EntityFormsCard entity={getEntity.data} />
      </Row>
    </Page>
  );
};

export default EntityPage;
