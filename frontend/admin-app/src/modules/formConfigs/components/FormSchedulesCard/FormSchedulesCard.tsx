import {
  Column,
  DeleteDialog,
  IconButton,
  Row,
  Text,
} from "@modules/core/components";
import { FormConfig } from "@modules/forms/types";
import {
  useCreateFormSchedule,
  useDeleteFormSchedule,
  useUpdateFormSchedule,
} from "@modules/formConfigs/hooks";
import React from "react";
import { FormScheduleListItem } from "..";
import { Dialog, Divider, List } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useFormData } from "@modules/core/hooks";
import { Add } from "@mui/icons-material";
import { ScheduleForm } from "@modules/formConfigs/components";
import { Schedule, ScheduleFormData } from "@modules/formConfigs/types";

export interface FormSchedulesCardProps {
  form: FormConfig;
}
export const FormSchedulesCard: React.FC<FormSchedulesCardProps> = ({
  form,
}) => {
  const { t } = useTranslation();
  const createFormSchedule = useCreateFormSchedule();
  const updateFormSchedule = useUpdateFormSchedule();
  const deleteFormSchedule = useDeleteFormSchedule();
  const scheduleData = useFormData<ScheduleFormData>();
  const deleteData = useFormData<Schedule>();

  const handleSaveSchedule = (data: ScheduleFormData) => {
    if (data.id) {
      updateFormSchedule.mutateAsync(data).then(() => {
        scheduleData.reset();
      });
    } else {
      createFormSchedule.mutateAsync(data).then(() => {
        scheduleData.reset();
      });
    }
  };

  return (
    <Column mt={1} mb={1} p={1} boxShadow={2}>
      <Row p={1} pl={2} justifyContent="space-between">
        <Text>{t("schedules")}</Text>
        <IconButton
          testId="add schedule button"
          Icon={<Add />}
          onClick={scheduleData.handleSet({
            configId: form.id,
            period: "Day",
            type: "Fix",
            frequency: 1,
            postpone: null,
            times: [],
          })}
        />
      </Row>
      <Divider />
      <List>
        {form.schedules?.map((schedule, i, arr) => (
          <FormScheduleListItem
            key={schedule.id}
            schedule={schedule}
            isLast={arr.length - 1 === i}
            onSelect={(schedule) =>
              scheduleData.set({ ...schedule, configId: form.id })
            }
            onDelete={deleteData.handleSet(schedule)}
          />
        ))}
      </List>
      <Dialog
        open={scheduleData.hasData}
        onClose={scheduleData.reset}
        maxWidth="md"
      >
        <ScheduleForm
          onSubmit={handleSaveSchedule}
          values={scheduleData.data}
          formProps={{ p: 2 }}
        />
      </Dialog>
      <DeleteDialog
        open={deleteData.hasData}
        onCancel={deleteData.reset}
        onConfirm={() =>
          deleteFormSchedule.mutateAsync(deleteData.data!).then(() => {
            deleteData.reset();
          })
        }
        record="schedule"
        target={t(deleteData.data?.period!)}
      />
    </Column>
  );
};
