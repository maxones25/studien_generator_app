import { useAccessTokenContext } from '@modules/auth/contexts';
import { useInitiateAccount } from '@modules/auth/hooks';
import { InitiateAccountData } from '@modules/auth/types';
import { Button, Form, FormPasswordField } from '@modules/core/components';
import { Dialog, DialogActions, DialogProps } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface InitiateAccountDialogProps extends DialogProps {}

export const InitiateAccountDialog : React.FC<InitiateAccountDialogProps>= ({
  open,
}) => {
  const accessToken = useAccessTokenContext();  
  const { t } = useTranslation();
  const initiateAccount = useInitiateAccount();
  const form = useForm<InitiateAccountData>();

  const validatePasswordMatch = () => {
    const values = form.getValues();
    return values.newPassword === values.repeatPassword || t("passwords do not match");
  };

  const onSubmit = form.handleSubmit((values) => {
    initiateAccount.mutate(values);
  })

  return (
    <Dialog open={open}>
      <Form sx={{p: 2}} onSubmit={onSubmit}>
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
        <DialogActions>
          <Button
            testId='change-password-cancel-button'
            onClick={accessToken.reset}
            isLoading={initiateAccount.isLoading}
            color={'error'}
            >
            {t('cancel')}
          </Button>
          <Button
            testId='change-password-submit-button'
            type='submit'
            isLoading={initiateAccount.isLoading}
            color={'primary'}
            >
            {t('save')}
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};