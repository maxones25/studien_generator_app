import { useAccessTokenContext } from "@modules/auth/contexts";
import { Column, Text } from "@modules/core/components";
import { useNavigationHelper } from "@modules/core/hooks";
import { useGetStudy } from "@modules/studies/hooks";
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
  const getStudy = useGetStudy();
  const accessToken = useAccessTokenContext();

  return (
    <Column component={Paper} width={250}>
      <Toolbar>
        <Text variant="body2">{title ?? "-"}</Text>
      </Toolbar>
      <Divider />
      <Column justifyContent="space-between" height="100%">
        <List>
          {menu.map(({ label, path }) => (
            <ListItem key={label} disablePadding divider>
              <ListItemButton onClick={navigate.handle(path)}>
                <ListItemText>{label}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Column>
          <Divider></Divider>
          <List>
            <ListItem divider>
              <ListItemText primary={getStudy.data?.role} secondary="Rolle" />
            </ListItem>
            <ListItem disablePadding divider>
              <ListItemButton onClick={navigate.handle("/studies")}>
                <ListItemText>Studien</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={accessToken.reset}>
                <ListItemText>Logout</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Column>
      </Column>
    </Column>
  );
};
