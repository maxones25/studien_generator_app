import { Button, Form, FormTextField } from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { GroupFormData } from "@modules/groups/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface GroupFormProps extends FormProps<GroupFormData> {}

export const GroupForm: React.FC<GroupFormProps> = ({
  onSubmit,
  values,
  formProps,
}) => {
  const { t } = useTranslation();
  const form = useForm<GroupFormData>({ values });

  return (
    <Form {...formProps} onSubmit={form.handleSubmit(onSubmit)}>
      <FormTextField
        label={t("name")}
        formState={form.formState}
        textFieldProps={form.register("name", {
          required: t("value required", { value: "name" }),
        })}
      />
      <FormControl margin="normal">
        <Button testId="group form submit button" type="submit">
          {t("save")}
        </Button>
      </FormControl>
    </Form>
  );
};
