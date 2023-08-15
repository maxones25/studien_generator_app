import {
  Column,
  DataList,
  IconButton,
  Row,
  Text,
} from "@modules/core/components";
import { FormConfig } from "@modules/forms/types";
import {
  useCreateFormSchedule,
  useDeleteFormSchedule,
  useGetFormSchedules,
  useUpdateFormSchedule,
} from "@modules/groups/hooks";
import React from "react";
import { FormScheduleForm, FormScheduleListItem } from "..";
import { Dialog, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useFormData } from "@modules/core/hooks";
import { FormScheduleFormData } from "@modules/groups/types";
import { Add } from "@mui/icons-material";

export interface FormSchedulesCardProps {
  form: FormConfig;
}

export const FormSchedulesCard: React.FC<FormSchedulesCardProps> = ({
  form,
}) => {
  const { t } = useTranslation();
  const getFormSchedules = useGetFormSchedules(form.id);
  const createFormSchedule = useCreateFormSchedule();
  const updateFormSchedule = useUpdateFormSchedule();
  const deleteFormSchedule = useDeleteFormSchedule();
  const scheduleData = useFormData<FormScheduleFormData>();

  const handleSaveSchedule = (data: FormScheduleFormData) => {
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
            postpone: {
              isActive: false,
              duration: 1,
              times: 1,
            },
          })}
        />
      </Row>
      <Divider />
      <DataList
        client={getFormSchedules}
        errorText=""
        noDataText=""
        renderItem={(schedule, { isLast }) => (
          <FormScheduleListItem
            key={schedule.id}
            schedule={schedule}
            isLast={isLast}
            onSelect={(schedule) =>
              scheduleData.set({ configId: form.id, ...schedule })
            }
            onDelete={deleteFormSchedule.mutate}
          />
        )}
      />
      <Dialog open={scheduleData.hasData} onClose={scheduleData.reset}>
        <FormScheduleForm
          onSubmit={handleSaveSchedule}
          values={scheduleData.data}
          formProps={{ p: 2 }}
        />
      </Dialog>
    </Column>
  );
};
