import {
  Button,
  Column,
  ExperimentalFormTextField,
  Form,
  FormSelect,
  FormSwitch,
  Row,
  Text,
} from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import {
  FormScheduleFormData,
  FormSchedulePeriod,
} from "@modules/groups/types";
import { Divider, FormControl, InputAdornment } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export interface FormScheduleFormProps
  extends FormProps<FormScheduleFormData> {}

export const FormScheduleForm: React.FC<FormScheduleFormProps> = ({
  onSubmit,
  values,
  formProps,
}) => {
  const { t } = useTranslation();
  const form = useForm<FormScheduleFormData>({ values });

  const period = form.watch("period");

  const frequencyUnit =
    period === "Day" ? t("days") : period === "Week" ? t("weeks") : t("months");

  const handleSubmit = (data: FormScheduleFormData) => {
    const daysOfWeek = data.daysOfWeek?.map((active) => Boolean(active));
    // @ts-ignore
    onSubmit({ ...data, daysOfWeek });
  };

  return (
    <Form {...formProps} form={form} onSubmit={handleSubmit}>
      <Row>
        <Column flex={1}>
          <FormSelect
            control={form.control}
            name="period"
            label={t("period")}
            options={Object.keys(FormSchedulePeriod).map((type) => ({
              label: t(type),
              value: type,
            }))}
          />
        </Column>
        <ExperimentalFormTextField
          form={form}
          name="frequency"
          type="number"
          label={t("all")}
          inputProps={{ step: 1 }}
          sx={{ ml: 1, flex: 1 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Text>{frequencyUnit}</Text>
              </InputAdornment>
            ),
          }}
        />
      </Row>
      {period === "Week" && (
        <>
          {daysOfWeek.map((day, i) => (
            <FormSwitch
              key={day}
              control={form.control}
              // @ts-ignore
              name={`daysOfWeek.${i}`}
              label={t(day)}
            />
          ))}
          <Divider sx={{ mt: 1, mb: 1 }} />
        </>
      )}
      <FormSwitch
        control={form.control}
        name="postpone.isActive"
        label={t("postponable")}
      />
      {form.watch("postpone.isActive") && (
        <>
          <ExperimentalFormTextField
            form={form}
            name="postpone.times"
            label={t("times")}
            type="number"
            inputProps={{ step: 1 }}
          />
          <ExperimentalFormTextField
            form={form}
            name="postpone.duration"
            type="number"
            label={t("maxDurationInDays")}
            inputProps={{ step: 1 }}
          />
        </>
      )}
      <FormControl margin="normal">
        <Button testId="form schedule form submit button" type="submit">
          Save
        </Button>
      </FormControl>
    </Form>
  );
};
