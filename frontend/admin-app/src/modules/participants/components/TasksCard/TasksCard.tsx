import {
  Column,
  ColumnProps,
  DataList,
  DataListItem,
  IconButton,
  Row,
  Text,
} from "@modules/core/components";
import { useFormData } from "@modules/core/hooks";
import { formatInputDateTime } from "@modules/date/utils";
import { useGetTasks } from "@modules/participants/hooks";
import { Participant, Task } from "@modules/participants/types";
import { TaskForm } from "@modules/tasks/components";
import { useCreateTask, useDeleteTask, useUpdateTask } from "@modules/tasks/hooks";
import { TaskFormData } from "@modules/tasks/types";
import {
  Add,
  CheckCircleOutline,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface TasksCardProps extends ColumnProps {
  participant: Participant;
}

export const TasksCard: React.FC<TasksCardProps> = ({
  participant,
  ...props
}) => {
  const { t } = useTranslation();
  const getTasks = useGetTasks();
  const updateTask = useUpdateTask();
  const createTask = useCreateTask();
  const taskData = useFormData<TaskFormData>();
  const deleteTask = useDeleteTask();

  const handleSave = async (data: TaskFormData) => {
    if (data.id) {
      await updateTask.mutateAsync(data);
    } else {
      await createTask.mutateAsync(data);
    }
    taskData.reset();
  };

  const handleDeleteTask= async (data: Task) => {
    await deleteTask.mutateAsync(data);
  };

  return (
    <Column {...props} p={1} boxShadow={4} overflowY="hidden">
      <Row p={1} pl={2} pr={2} mb={1}>
        <Text>{t("tasks")}</Text>
        <IconButton
          testId="open add task dialog"
          Icon={<Add />}
          onClick={taskData.handleSet({
            completedAt: null,
            participantId: participant.id,
            rescheduled: 0,
            scheduledAt: "",
            formId: "",
          })}
        />
      </Row>
      <Divider></Divider>
      <DataList
        client={getTasks}
        errorText=""
        noDataText=""
        filter={(task) => task.deletedAt == undefined}
        renderItem={(task, {isLast}) => (
          <DataListItem
            divider={!isLast}
            item={task}
            onDelete={handleDeleteTask}
            onUpdate={taskData.handleSet(task)}
            key={task.id}
          >
            <ListItemButton
              dense
            >
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
          </DataListItem>
        )}
      />
      <Dialog open={taskData.hasData} onClose={taskData.reset}>
        <DialogTitle>{t("edit task")}</DialogTitle>
        <DialogContent>
          <TaskForm
            values={{
              ...taskData.data,
              rescheduled: taskData.data?.rescheduled ?? 0,
              participantId: taskData.data?.participantId,
              completedAt: formatInputDateTime(taskData.data?.completedAt),
              scheduledAt: formatInputDateTime(taskData.data?.scheduledAt),
            }}
            isNew={taskData.isNew}
            participant={participant}
            onSubmit={handleSave}
          />
        </DialogContent>
      </Dialog>
    </Column>
  );
};
