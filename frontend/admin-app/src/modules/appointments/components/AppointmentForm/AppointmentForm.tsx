import { AppointmentFormData } from "@modules/appointments/types";
import {
  Button,
  ExperimentalFormTextField,
  Form,
  Row,
} from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface AppointmentFormProps extends FormProps<AppointmentFormData> {}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  values,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const form = useForm<AppointmentFormData>({ values });

  const startDate = form.watch("startDate");
  const startTime = form.watch("startTime");
  const endDate = form.watch("endDate");
  const endTime = form.watch("endTime");

  const start =
    startDate && startTime ? new Date(startDate + "T" + startTime) : null;
  const end = endDate && endTime ? new Date(endDate + "T" + endTime) : null;

  const validate =
    start && end ? () => start.getTime() < end.getTime() || "error" : undefined;

  return (
    <Form form={form} onSubmit={onSubmit}>
      <ExperimentalFormTextField form={form} name="subject" required />
      <Row alignItems="flex-start">
        <ExperimentalFormTextField
          form={form}
          type="date"
          name="startDate"
          required
          validate={
            validate
              ? {
                  validate,
                }
              : undefined
          }
        />
        <ExperimentalFormTextField
          form={form}
          type="time"
          name="startTime"
          sx={{ ml: 1 }}
          required
        />
        <ExperimentalFormTextField
          form={form}
          type="date"
          name="endDate"
          sx={{ ml: 2 }}
          required
        />
        <ExperimentalFormTextField
          form={form}
          type="time"
          name="endTime"
          sx={{ ml: 1 }}
          required
        />
      </Row>
      <FormControl margin="normal">
        <Button testId="submit appointment form" type="submit">
          {t("save")}
        </Button>
      </FormControl>
    </Form>
  );
};
