import { Row, Text, Button, Form } from '@modules/core/components';
import { useFormDataContext } from '@modules/forms/contexts';
import { Dialog, TextField } from '@mui/material';
import { t } from 'i18next';
import React from 'react';
import { useForm } from 'react-hook-form';

export interface FailureDialogProps {
  open: boolean,
  onClose: () => void,
  onAccept: () => void,
}

interface FailureReason {
  failureReason: string,
}

export const FailureDialog : React.FC<FailureDialogProps>= ({
  open,
  onClose,
  onAccept,
}) => {

  const form = useForm<FailureReason>();
  const { handleFailure } = useFormDataContext();

  const handleAccept = async (data: FailureReason) => {
    handleFailure({}, data.failureReason);
    onAccept();
  };

  const error = form.formState.errors.failureReason

  return (
    <Dialog open={open} onClose={onClose}>
      <Form sx={{p: 2}} onSubmit={form.handleSubmit(handleAccept)}>
        <Text pb={2}>{t('hiit cancel')}</Text>
        <TextField 
          fullWidth={true}
          variant={'outlined'}
          inputProps={form.register('failureReason', {
            required: t("value required", { value: t("failure reason") })
          })}
          error={Boolean(error)}
          helperText={error?.message?.toString() ?? null}
          label={t('reason for failure')}
        />
        <Row pt={2} gap={2}>
          <Button 
            testId='cancel-failure-hiit'
            onClick={onClose}
          >{t("continue")}</Button>
          <Button 
            color='error'
            testId='save-failure-hiit'
            type='submit'
          >{t("cancel")}</Button>
        </Row>
      </Form>
    </Dialog>
  );
};