import { Row, Button, Form, FormNumberPicker } from '@modules/core/components';
import { useRescheduleTask } from '@modules/tasks/hooks';
import { Task } from '@modules/tasks/types';
import { Dialog } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface RescheduleDialogProps {
  open: boolean,
  onClose: () => void,
  task: Task,
}

export interface RescheduleData {
  days: number,
}

export const RescheduleDialog : React.FC<RescheduleDialogProps>= ({
  open,
  onClose,
  task,
}) => {
  const { t } = useTranslation();
  const { handleSubmit, formState, register } = useForm<RescheduleData>();
  const rescheduleTask = useRescheduleTask();

  const onSubmit = (data: RescheduleData) => {
    const newDate = dayjs(task.scheduledAt).add(data.days, 'day').toDate();
    rescheduleTask.mutateAsync({
      id: task.id,
      date: newDate,
    })
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormNumberPicker 
          formState={formState}
          textFieldProps={register("days", {
            required: true,
            min: 1,
            max: task.schedule.postpone?.duration,
          })}
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