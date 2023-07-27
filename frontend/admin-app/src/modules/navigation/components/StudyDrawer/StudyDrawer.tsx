import { useAccessTokenContext } from "@modules/auth/contexts";
import { Column, Text } from "@modules/core/components";
import { useNavigationHelper } from "@modules/core/hooks";
import { useStudyContext } from "@modules/studies/contexts";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface StudyDrawerProps {
  title?: string;
}

const menu = [
  {
    path: "members",
    label: "members",
  },
  {
    path: "groups",
    label: "groups",
  },
  {
    path: "participants",
    label: "participants",
  },
  {
    path: "forms",
    label: "forms",
  },
  {
    path: "entities",
    label: "entities",
  },
  {
    path: "data",
    label: "data",
  },
  {
    path: "chats",
    label: "chats",
  },
];

export const StudyDrawer: React.FC<StudyDrawerProps> = ({ title }) => {
  const { t } = useTranslation();
  const navigate = useNavigationHelper();
  const getStudy = useStudyContext();
  const accessToken = useAccessTokenContext();

  return (
    <Column width={200} boxShadow={6} zIndex={1000}>
      <Toolbar>
        <Text variant="body2">{title ?? "-"}</Text>
      </Toolbar>
      <Divider />
      <Column justifyContent="space-between" height="100%">
        <List>
          {menu.map(({ label, path }) => (
            <ListItem key={path} disablePadding divider>
              <ListItemButton onClick={navigate.handle(path)}>
                <ListItemText>{t(label)}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Column>
          <Divider></Divider>
          <List>
            <ListItem divider>
              <ListItemText
                primary={t(getStudy.data?.role ?? "-")}
                secondary={t("role")}
              />
            </ListItem>
            <ListItem disablePadding divider>
              <ListItemButton onClick={navigate.handle("/studies")}>
                <ListItemText>{t("studies")}</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={accessToken.reset}>
                <ListItemText>{t("logout")}</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Column>
      </Column>
    </Column>
  );
};
