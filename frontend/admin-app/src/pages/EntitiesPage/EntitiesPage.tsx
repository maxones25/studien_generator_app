import { Page } from "@modules/core/components";
import { useGetEntities } from "@modules/entities/hooks";
import { List, ListItem, ListItemText } from "@mui/material";
import React from "react";

export interface EntitiesPageProps {}

const EntitiesPage: React.FC<EntitiesPageProps> = () => {
  const getEntities = useGetEntities();

  return (
    <Page testId="entities page">
      <List>
        {getEntities.data?.map((entity) => (
          <ListItem>
            <ListItemText>{entity.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Page>
  );
};

export default EntitiesPage;
