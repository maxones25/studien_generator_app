import {
  Column,
  ColumnProps,
  DataList,
  Row,
  Text,
} from "@modules/core/components";
import { useGetTasks } from "@modules/participants/hooks";
import { CheckCircleOutline, RadioButtonUnchecked } from "@mui/icons-material";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface TasksCardProps extends ColumnProps {}

export const TasksCard: React.FC<TasksCardProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const getTasks = useGetTasks();

  return (
    <Column {...props} p={1} boxShadow={4} overflowY="hidden">
      <Row p={1} pl={2} pr={2} mb={1}>
        <Text>{t("tasks")}</Text>
      </Row>
      <Divider></Divider>
      <DataList
        client={getTasks}
        errorText=""
        noDataText=""
        renderItem={(task) => (
          <ListItemButton key={task.id} dense>
            <ListItemIcon>
              {task.completedAt !== null ? (
                <CheckCircleOutline />
              ) : (
                <RadioButtonUnchecked />
              )}
            </ListItemIcon>
            <ListItemText
              primary={task.form.name}
              secondary={new Date(task.scheduledAt).toLocaleDateString("de", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
          </ListItemButton>
        )}
      />
    </Column>
  );
};
