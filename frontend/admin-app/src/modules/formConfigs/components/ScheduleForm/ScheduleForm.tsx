import {
  Button,
  Column,
  ExperimentalFormTextField,
  Form,
  FormSwitch,
  IconButton,
  Row,
  Text,
} from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import {
  ScheduleDaysOfWeek,
  ScheduleFormData,
} from "@modules/formConfigs/types";
import { Add, Remove } from "@mui/icons-material";
import { Divider, FormControl, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  DaysOfMonthPicker,
  DaysOfWeekPicker,
  SchedulePeriodSelect,
  ScheduleTypeSelect,
} from "..";

export interface FormScheduleFormProps extends FormProps<ScheduleFormData> {}

export const ScheduleForm: React.FC<FormScheduleFormProps> = ({
  onSubmit,
  values,
  formProps,
}) => {
  const { t } = useTranslation();
  const form = useForm<ScheduleFormData>({ values });

  const type = form.watch("type");
  const period = form.watch("period");

  const frequencyUnit =
    period === "Day" ? t("days") : period === "Week" ? t("weeks") : t("months");

  const handleSubmit = (data: ScheduleFormData) => {
    const postpone = data.postpone ? data.postpone : null;
    if (data.type === "Fix" && data.period === "Week") {
      const daysOfWeek = data.daysOfWeek.map((active) =>
        Boolean(active)
      ) as ScheduleDaysOfWeek;
      onSubmit({ ...data, postpone, daysOfWeek });
    } else {
      onSubmit({ ...data, postpone });
    }
  };

  return (
    <Form {...formProps} form={form} onSubmit={handleSubmit}>
      <Row alignItems="stretch">
        <Column>
          <Row>
            <Column flex={1}>
              <ScheduleTypeSelect control={form.control} name="type" />
            </Column>
            <Column flex={1} ml={1}>
              <SchedulePeriodSelect control={form.control} name="period" />
            </Column>
            {type === "Fix" ? (
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
            ) : (
              <ExperimentalFormTextField
                form={form}
                name="amount"
                type="number"
                label={t("howOften")}
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
            )}
          </Row>
          {period === "Week" && type === "Fix" && (
            <>
              <DaysOfWeekPicker control={form.control} name="daysOfWeek" />
              <Divider sx={{ mt: 1, mb: 1 }} />
            </>
          )}
          {period === "Month" && type === "Fix" && (
            <>
              <Divider sx={{ mt: 1, mb: 1 }} />
              <DaysOfMonthPicker control={form.control} name="daysOfMonth" />
              <Divider sx={{ mt: 1, mb: 1 }} />
            </>
          )}
          <FormSwitch
            control={form.control}
            name="postpone"
            label={t("postponable")}
          />
          {form.watch("postpone") && (
            <Row>
              <ExperimentalFormTextField
                form={form}
                name="postpone.times"
                label={t("how often")}
                type="number"
                required
                inputProps={{ step: 1 }}
              />
              <ExperimentalFormTextField
                form={form}
                name="postpone.duration"
                label={t("how many days")}
                type="number"
                required
                inputProps={{ step: 1 }}
                sx={{ ml: 1 }}
              />
            </Row>
          )}
          <FormControl margin="normal">
            <Button testId="form schedule form submit button" type="submit">
              Save
            </Button>
          </FormControl>
        </Column>
        <>
          <Divider
            orientation="vertical"
            flexItem={true}
            sx={{ ml: 3, mr: 3 }}
          />
          <Controller
            control={form.control}
            name="times"
            rules={{
              validate: {
                minLength: (times) =>
                  times.length > 0 ||
                  t("value required", { value: t("times") }),
              },
            }}
            render={({
              field: { value: times, onChange },
              formState: { errors },
            }) => {
              const hasError = Boolean(errors.times?.message);
              const color = hasError ? "error" : "default";
              return (
                <Column>
                  <Row justifyContent="space-between">
                    <Text color={color}>{t("times")}</Text>
                    <IconButton
                      testId="add time button"
                      Icon={<Add />}
                      color={color}
                      onClick={() => {
                        onChange([...times, "00:00"]);
                      }}
                    />
                  </Row>
                  <Column>
                    {times.map((time, i) => (
                      <Row key={time} mt={1}>
                        <TextField
                          type="time"
                          size="small"
                          defaultValue={time}
                          onBlur={(e) => {
                            const time = e.currentTarget.value;
                            if (time) {
                              times[i] = time;
                              onChange(times);
                            }
                          }}
                        />
                        <IconButton
                          testId="remove time button"
                          Icon={<Remove />}
                          onClick={() => {
                            onChange(times.filter((_, j) => i !== j));
                          }}
                        />
                      </Row>
                    ))}
                  </Column>
                </Column>
              );
            }}
          />
        </>
      </Row>
    </Form>
  );
};
