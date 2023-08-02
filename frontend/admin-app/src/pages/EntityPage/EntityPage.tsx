import { Page, Row, Text } from "@modules/core/components";
import {
  EntityFieldsCard,
  EntityFormsCard,
} from "@modules/entities/components";
import { useGetEntity } from "@modules/entities/hooks";
import { LinearProgress, Toolbar } from "@mui/material";
import React from "react";

export interface EntityPageProps {}

const EntityPage: React.FC<EntityPageProps> = () => {
  const getEntity = useGetEntity();

  if (!getEntity.data) {
    return <LinearProgress />;
  }

  return (
    <Page testId="entity page" flex={1}>
      <Toolbar sx={{ ml: 2 }}>
        <Text variant="h6">{getEntity.data?.name}</Text>
      </Toolbar>
      <Row m={2} mt={0} mb={0} alignItems="stretch">
        <EntityFieldsCard />
        <EntityFormsCard entity={getEntity.data} />
      </Row>
    </Page>
  );
};

export default EntityPage;
