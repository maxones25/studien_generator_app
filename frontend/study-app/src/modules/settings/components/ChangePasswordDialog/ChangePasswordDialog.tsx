import { Button, Form, FormPasswordField } from '@modules/core/components';
import { useChangePassword } from '@modules/settings/hooks';
import { ChangePasswordFormData } from '@modules/settings/types';
import { CloseSharp } from '@mui/icons-material';
import { Box, Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface ChangePasswordDialogProps {
  open: boolean;
  close: VoidFunction;
}

export const ChangePasswordDialog : React.FC<ChangePasswordDialogProps>= ({
  open,
  close,
}) => {
  const { t } = useTranslation();
  const changePassword = useChangePassword();
  const form = useForm<ChangePasswordFormData>();

  const validatePasswordMatch = () => {
    const values = form.getValues();
    return values.newPassword === values.repeatPassword || t("passwords do not match");
  };

  const onSubmit = form.handleSubmit((values) => {
    changePassword.mutate(values);
    close();
  })

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle sx={{ m: 0, p: 2, position: 'relative' }}>
        <Box sx={{ pr: 3 /* Abstand rechts für den Schließbutton */, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          {t('change password')}
        </Box>
        <IconButton
          aria-label="close"
          onClick={close}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseSharp />
        </IconButton>
      </DialogTitle>
      <Form sx={{p: 2}} onSubmit={onSubmit}>
        <FormPasswordField
          control={form.control}
          label={t("oldPassword")}
          formState={form.formState}
          textFieldProps={form.register("oldPassword", {
            required: t("value required", { value: t("oldPassword") }),
          })}
        />
        <FormPasswordField
          control={form.control}
          label={t("newPassword")}
          formState={form.formState}
          textFieldProps={form.register("newPassword", {
            required: t("value required", { value: t("newPassword") }),
            minLength: {
              value: 8,
              message: t("min length", { value: 8 }),
            },
          })}
        />
        <FormPasswordField
          control={form.control}
          label={t("repeatPassword")}
          formState={form.formState}
          textFieldProps={form.register("repeatPassword", {
            required: t("value required", { value: t("repeatPassword") }),
            validate: validatePasswordMatch,
          })}
        />
        <DialogActions sx={{mt: '16px'}}>
          <Button
            testId='change-password-cancel-button'
            onClick={close}
            isLoading={changePassword.isLoading}
            color={'error'}
            >
            {t('cancel')}
          </Button>
          <Button
            testId='change-password-submit-button'
            type='submit'
            isLoading={changePassword.isLoading}
            color={'primary'}
            >
            {t('save')}
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};