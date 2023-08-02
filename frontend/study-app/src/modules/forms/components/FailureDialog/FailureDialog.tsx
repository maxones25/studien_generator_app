import { Column, Row, Text, Button } from '@modules/core/components';
import { Dialog, FormControl, TextField } from '@mui/material';
import { t } from 'i18next';
import React from 'react';
import { Control, Controller, FieldValues, Path, PathValue, RegisterOptions, get, set } from 'react-hook-form';

export interface FailureDialogProps {
  open: boolean,
  onClose: () => void,
  onAccept: () => void
  control: Control<FieldValues>;
  name: Path<FieldValues>
  rules?: Omit<
      RegisterOptions<FieldValues, Path<FieldValues>>,
      "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >;
}

export const FailureDialog : React.FC<FailureDialogProps>= ({
  open,
  onClose,
  onAccept,
  control,
  name,
  rules,
}) => {

  const handleAccept = async () => {
    const submit = control.handleSubmit((data) => console.log(data))
    await submit();
    const err = get(control._formState.errors, name);
    if(!err) onAccept();
  }

  const handleCancel = () => {
    set(control._formValues, name, undefined);
    onClose();
  }

  return (
    <Dialog open={open} onClose={handleCancel}>
      <Column m={2}>
        <Text>{t('hiit cancel')}</Text>
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, value, ...field}, formState }) => {
          const error = get(formState.errors, name);

          return(
            <TextField 
              fullWidth={true}
              variant={'outlined'}
              error={Boolean(error)}
              helperText={error?.message?.toString() ?? null}
              label={t('reason for failure')}
              onChange={(event) => {
                onChange(event.target.value as PathValue<FieldValues, Path<FieldValues>>);
              }}
              {...field} 
            />
          )}}
        />
        <Row mt={2}>
          <Button 
            testId='cancel-failure-hiit'
            onClick={handleCancel}
            sx={{m: 1}}
          >{t("cancel")}</Button>
          <FormControl margin="normal">
            <Button 
              color='error'
              testId='save-failure-hiit'
              onClick={handleAccept}
              sx={{m: 1}}
              type="submit"
            >{t("save")}</Button>
          </FormControl>
        </Row>
      </Column>
    </Dialog>
  );
};