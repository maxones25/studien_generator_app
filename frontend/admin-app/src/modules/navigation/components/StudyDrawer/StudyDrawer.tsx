import { Column, Text } from "@modules/core/components";
import { useNavigationHelper } from "@modules/core/hooks";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Toolbar,
} from "@mui/material";
import React from "react";

export interface StudyDrawerProps {
  title?: string;
}

const menu = [
  {
    label: "Mitarbeitenden",
    path: "members",
  },
  {
    label: "Gruppen",
    path: "groups",
  },
  {
    label: "Probanden",
    path: "participants",
  },
  {
    label: "Entitäten",
    path: "entities",
  },
];

export const StudyDrawer: React.FC<StudyDrawerProps> = ({ title }) => {
  const navigate = useNavigationHelper();

  return (
    <Column component={Paper} minWidth={200} maxWidth={250}>
      <Toolbar>
        <Text variant="body2">{title ?? "-"}</Text>
      </Toolbar>
      <Divider />
      <List>
        {menu.map(({ label, path }) => (
          <ListItem key={label} disablePadding divider>
            <ListItemButton onClick={navigate.handle(path)}>
              <ListItemText>{label}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Column>
  );
};
