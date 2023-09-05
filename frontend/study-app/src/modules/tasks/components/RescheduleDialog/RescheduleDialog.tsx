import { Row, Button, Form } from '@modules/core/components';
import { useRescheduleTask } from '@modules/tasks/hooks';
import { Task } from '@modules/tasks/types';
import { Dialog, DialogTitle } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { Controller, FieldValues, Path, PathValue, get, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface RescheduleDialogProps {
  open: boolean,
  onClose: () => void,
  task: Task,
}

export interface RescheduleData {
  date: Dayjs,
}

export const RescheduleDialog : React.FC<RescheduleDialogProps>= ({
  open,
  onClose,
  task,
}) => {
  const { t } = useTranslation();
  const form = useForm<RescheduleData>();
  const rescheduleTask = useRescheduleTask();

  const onSubmit = (data: RescheduleData) => {
    rescheduleTask.mutateAsync({
      id: task.id,
      date: data.date.toDate(),
    });
    onClose();
  }

  const dayjsScheduledAt = dayjs(task.scheduledAt);
  const thirtyMinutesFromNow = dayjs().add(30, 'minutes');
  let minDateTime = dayjsScheduledAt.add(30, 'minutes');
  minDateTime = minDateTime < thirtyMinutesFromNow ? thirtyMinutesFromNow : minDateTime
  const maxDateTime = dayjsScheduledAt.add(
    task?.schedule?.postpone?.duration ?? 0, 'days');

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('reschedule task')}</DialogTitle>
      <Form m={2} onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
        control={form.control}
        name={'date'}
        rules={{required: t("value required", { value: t("days") })}}
        defaultValue={minDateTime as PathValue<FieldValues, Path<FieldValues>>}
        render={({ field: { onChange, value, ...field }, formState }) => {
          const error = get(formState.errors, 'date');
          return (
            <MobileDateTimePicker
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                  error: Boolean(error),
                  helperText: error?.message?.toString() ?? null,
                },
              }}
              minDateTime={minDateTime}
              maxDateTime={maxDateTime}
              value={value}
              label={t("select date")}
              onChange={(value: Dayjs | null) => {
                onChange(value as PathValue<FieldValues, Path<FieldValues>>);
              }}
              {...field}
            />
          );
        }}
      />
        <Row mt={2}>
          <Button 
            color='error'
            testId='cancel-reschedule'
            onClick={onClose}
            sx={{m: 1}}
          >{t("cancel")}</Button>
          <Button 
            testId='accept-reschedule'
            type='submit'
            sx={{m: 1}}
          >{t("save")}</Button>
        </Row>
      </Form>
    </Dialog>
  );
};