import { Button, Form, Row, TimesPicker } from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import {
  DaysOfMonthPicker,
  DaysOfWeekPicker,
} from "@modules/formConfigs/components";
import {
  Schedule,
  ScheduleDaysOfMonth,
  ScheduleDaysOfWeek,
} from "@modules/formConfigs/types";
import { FormControl } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export type TimesFormData = {
  times: string[];
  daysOfWeek?: ScheduleDaysOfWeek;
  daysOfMonth?: ScheduleDaysOfMonth;
};
export interface TimesFormProps extends FormProps<TimesFormData> {
  schedule: Schedule;
}

export const TimesForm: React.FC<TimesFormProps> = ({
  onSubmit,
  onCancel,
  values,
  schedule,
}) => {
  const { t } = useTranslation();
  const form = useForm<TimesFormData>({ values });

  return (
    <Form form={form} onSubmit={onSubmit}>
      <TimesPicker form={form} name="times" />
      {schedule.type === "Flexible" && schedule.period === "Week" && (
        <DaysOfWeekPicker control={form.control} name="daysOfWeek" />
      )}
      {schedule.type === "Flexible" && schedule.period === "Month" && (
        <DaysOfMonthPicker control={form.control} name="daysOfMonth" />
      )}
      <FormControl margin="normal" sx={{ display: "flex" }}>
        <Row justifyContent="flex-end">
          <Button
            testId="cancel times form"
            type="button"
            color="secondary"
            size="small"
            sx={{ mr: 1 }}
            onClick={onCancel}
          >
            {t("back")}
          </Button>
          <Button testId="submit times form" type="submit" size="small">
            {t("continue")}
          </Button>
        </Row>
      </FormControl>
    </Form>
  );
};
