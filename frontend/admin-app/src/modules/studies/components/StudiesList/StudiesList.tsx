import { Column, Text } from "@modules/core/components";
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

  return (
    <Column alignItems="center" p={1} boxShadow={1} borderRadius={1}>
      {getStudies.isLoading ? (
        <CircularProgress data-testid="loading studies spinner"/>
      ) : !hasStudies ? (
        <Text>{t("no studies found")}</Text>
      ) : (
        <List sx={{ width: "100%" }}>
          {getStudies.data?.map((study, i, arr) => (
            <ListItem key={study.id} divider={i < arr.length - 1} disablePadding>
              <ListItemButton>
                <ListItemText>{study.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Column>
  );
};
