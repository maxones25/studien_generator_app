import { Column, Text } from "@modules/core/components";
import { useGetStudies } from "@modules/studies/hooks";
import { Study } from "@modules/studies/types";
import {
  Chip,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface StudiesListProps {
  onSelect: (data: Study) => void;
}

export const StudiesList: React.FC<StudiesListProps> = ({ onSelect }) => {
  const { t } = useTranslation();
  const getStudies = useGetStudies();

  const hasStudies = (getStudies.data?.length ?? 0) > 0;

  return (
    <Column
      alignItems="center"
      p={1}
      boxShadow={1}
      borderRadius={1}
      sx={{ overflowY: "scroll" }}
    >
      {getStudies.isLoading ? (
        <CircularProgress data-testid="loading studies spinner" />
      ) : getStudies.isError ? (
        <Text data-testid="get-studies-error-text" color="error.main">
          {t("error: studies could not load")}
        </Text>
      ) : !hasStudies ? (
        <Text>{t("no studies found")}</Text>
      ) : (
        <List sx={{ width: "100%" }}>
          {getStudies.data?.map((study, i, arr) => (
            <ListItem
              key={study.id}
              divider={i < arr.length - 1}
              disablePadding
              dense
            >
              <ListItemButton data-testid={`open study ${i}`} onClick={() => onSelect(study)} sx={{}}>
                <ListItemText primary={study.name} secondary={t(study.role)} />
                {study.deletedAt !== null && (
                  <Chip color="error" label={t("deleted")} />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Column>
  );
};
