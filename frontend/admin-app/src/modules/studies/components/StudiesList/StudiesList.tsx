import { Column, Text } from "@modules/core/components";
import { useGetStudies } from "@modules/studies/hooks";
import { Study } from "@modules/studies/types";
import { Edit } from "@mui/icons-material";
import {
  Chip,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface StudiesListProps {
  onUpdate: (data: Study) => void;
  onSelect: (data: Study) => void;
}

export const StudiesList: React.FC<StudiesListProps> = ({
  onUpdate,
  onSelect,
}) => {
  const { t } = useTranslation();
  const getStudies = useGetStudies();

  const handleUpdateStudy = (study: Study) => () => {
    onUpdate(study);
  };

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
              <ListItemButton onClick={() => onSelect(study)} sx={{}}>
                <ListItemText primary={study.name} secondary={t(study.role)} />
                {study.deletedAt !== null && (
                  <Chip color="error" label={t("deleted")} />
                )}
              </ListItemButton>
              <ListItemSecondaryAction>
                {study.role === "admin" && (
                  <IconButton
                    data-testid={`update-study-${study.name}-button`}
                    onClick={handleUpdateStudy(study)}
                  >
                    <Edit />
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Column>
  );
};
