import { Column, Text } from "@modules/core/components";
import { useGetStudies } from "@modules/studies/hooks";
import { Study } from "@modules/studies/types";
import { Delete, Edit } from "@mui/icons-material";
import {
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
  onDelete: (data: Study) => void;
}

export const StudiesList: React.FC<StudiesListProps> = ({
  onUpdate,
  onDelete,
}) => {
  const { t } = useTranslation();
  const getStudies = useGetStudies();

  const handleUpdateStudy = (study: Study) => () => {
    onUpdate(study);
  };

  const handleDeleteStudy = (study: Study) => () => {
    onDelete(study);
  };

  const hasStudies = (getStudies.data?.length ?? 0) > 0;

  console.log(getStudies);

  return (
    <Column alignItems="center" p={1} boxShadow={1} borderRadius={1}>
      {getStudies.isLoading ? (
        <CircularProgress data-testid="loading studies spinner" />
      ) : getStudies.isError ? (
        <Text data-testid="get-studies-error-text" color="error.main">{t("error: studies could not load")}</Text>
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
              <ListItemButton>
                <ListItemText primary={study.name} secondary={t(study.role)} />
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
                {study.role === "admin" && (
                  <IconButton
                    data-testid={`delete-study-${study.name}-button`}
                    onClick={handleDeleteStudy(study)}
                  >
                    <Delete />
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
