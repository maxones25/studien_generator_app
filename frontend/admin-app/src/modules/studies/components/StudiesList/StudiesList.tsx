import { Text } from "@modules/core/components";
import { useGetStudies } from "@modules/studies/hooks";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface StudiesListProps {}

export const StudiesList: React.FC<StudiesListProps> = () => {
  const { t } = useTranslation();
  const getStudies = useGetStudies();

  const hasStudies = (getStudies.data?.length ?? 0) > 0;

  return getStudies.isLoading ? (
    <CircularProgress />
  ) : !hasStudies ? (
    <Text>{t("no studies found")}</Text>
  ) : (
    <List>
      {getStudies.data?.map((study) => (
        <ListItem key={study.id} divider disablePadding>
          <ListItemButton>
            <ListItemText>{study.name}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
