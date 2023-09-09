import { useAccessTokenContext } from "@modules/auth/contexts";
import { useChatMessagesContext } from "@modules/chat/contexts";
import { Column, Row, Text } from "@modules/core/components";
import { useNavigationHelper } from "@modules/core/hooks";
import { isoDate } from "@modules/date/utils";
import { Study } from "@modules/studies/types";
import {
  Construction,
  Delete,
  Done,
  Loop,
  Schedule,
} from "@mui/icons-material";
import {
  Badge,
  BadgeProps,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  styled,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -20,
    top: 15,
    border: `1px solid ${theme.palette.background.paper}`,
  },
}));

const menu = [
  {
    path: "",
    label: "study",
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
    path: "records",
    label: "data",
  },
  {
    path: "chats",
    label: "chats",
  },
];

export interface StudyDrawerProps {
  study: Study;
}

export const StudyDrawer: React.FC<StudyDrawerProps> = ({ study }) => {
  const { t } = useTranslation();
  const navigate = useNavigationHelper();
  const accessToken = useAccessTokenContext();
  const { unreadCount } = useChatMessagesContext();

  const currentDate = isoDate();

  const isDeleted = study.deletedAt !== null;

  const StatusIcon = isDeleted
    ? Delete
    : study.isActive
    ? study.startDate && currentDate < study.startDate
      ? Schedule
      : study.endDate && currentDate > study.endDate
      ? Done
      : Loop
    : Construction;

  return (
    <Column width={200} boxShadow={6} zIndex={1000}>
      <Toolbar>
        <Row mr={1}>
          {StatusIcon && (
            <StatusIcon
              color={isDeleted ? "error" : undefined}
              fontSize="small"
            />
          )}
        </Row>
        <Text variant="body2" color={isDeleted ? "error" : undefined}>
          {study.name}
        </Text>
      </Toolbar>
      <Divider />
      <Column justifyContent="space-between" height="100%">
        <List>
          {menu.map(({ label, path }) =>
            path === "chats" ? (
              <ListItem key={path} disablePadding divider>
                <ListItemButton onClick={navigate.handle(path)}>
                  <StyledBadge
                    badgeContent={unreadCount.data ?? 0}
                    color="error"
                    max={999}
                  >
                    <ListItemText>{t(label)}</ListItemText>
                  </StyledBadge>
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem key={path} disablePadding divider>
                <ListItemButton onClick={navigate.handle(path)}>
                  <ListItemText>{t(label)}</ListItemText>
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        <Column>
          <Divider></Divider>
          <List>
            <ListItem divider>
              <ListItemText primary={t(study.role)} secondary={t("role")} />
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
