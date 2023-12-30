import { LoginFormData } from "@modules/auth/types";
import {
  Button,
  Form,
  FormPasswordField,
  FormTextField,
  IconButton,
  Row,
  Text,
} from "@modules/core/components";
import { useOpen, useValue } from "@modules/core/hooks";
import { FormProps } from "@modules/core/types";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { QrCodeReaderDialog } from "..";
import { CameraAltOutlined } from "@mui/icons-material";

export interface LoginFormProps extends FormProps<LoginFormData> {}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isError,
  isLoading,
  formProps,
}) => {
  const { t } = useTranslation();
  const { set, value: formData } = useValue<LoginFormData>({loginId: '', password: ''});
  const form = useForm<LoginFormData>({values: formData});
  const { open, close, isOpen } = useOpen(false);

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)} {...formProps}>
      <FormTextField
        control={form.control}
        label={t("loginId")}
        formState={form.formState}
        textFieldProps={form.register("loginId", {
          required: t("value required", { value: t("loginId") }),
        })}
      />
      <FormPasswordField
        control={form.control}
        label={t("password")}
        formState={form.formState}
        textFieldProps={form.register("password", {
          required: t("value required", { value: t("password") }),
        })}
      />
      {isError && (
        <Text data-testid="login-error-text" color="error.main">
          {t("access denied")}
        </Text>
      )}
      <Row>
        <Button
          testId="login-submit-button"
          type="submit"
          isLoading={isLoading}
          sx={{
            flexGrow: 1,
          }}
        >
          {t("start")}
        </Button>
        <IconButton 
          Icon={<CameraAltOutlined/>}
          testId="qr-scanner-icon"
          onClick={open}
        />
      </Row>
      <QrCodeReaderDialog 
        open={isOpen}
        close={close}
        setValues={set}
      />
    </Form>
  );
};
