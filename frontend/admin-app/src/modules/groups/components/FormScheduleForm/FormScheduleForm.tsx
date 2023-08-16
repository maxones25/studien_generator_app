import {
  Button,
  Column,
  ExperimentalFormTextField,
  Form,
  FormSelect,
  FormSwitch,
  IconButton,
  Row,
  Text,
} from "@modules/core/components";
import { FormProps } from "@modules/core/types";
import {
  FormScheduleFormData,
  FormSchedulePeriod,
} from "@modules/groups/types";
import { Add, Remove } from "@mui/icons-material";
import {
  Chip,
  Divider,
  FormControl,
  InputAdornment,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
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

const daysOfMonth = new Array(28).fill(null).map((_, i) => i + 1);

const transformToMatrix = (arr: number[], rows: number, cols: number) => {
  return Array.from({ length: rows }, (_, rowIndex) => {
    return arr.slice(rowIndex * cols, (rowIndex + 1) * cols);
  });
};

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
      <Row alignItems="stretch">
        <Column>
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
          {period === "Month" && (
            <>
              <Divider sx={{ mt: 1, mb: 1 }} />
              <Text variant="body2" sx={{ mb: 1 }}>
                {t("days")}
              </Text>
              <Controller
                control={form.control}
                name="dayOfMonth"
                render={({ field: { value } }) => {
                  return (
                    <Column>
                      {transformToMatrix(daysOfMonth, 4, 7).map((row) => (
                        <Row flexWrap="wrap">
                          {row.map((day) => (
                            <Chip
                              key={day}
                              label={day}
                              color={
                                value?.includes(day) ? "primary" : "default"
                              }
                              sx={{ m: 0.5, width: 40 }}
                              size="small"
                              onClick={() => {
                                if (!value) {
                                  form.setValue("dayOfMonth", [day]);
                                } else if (value.includes(day)) {
                                  form.setValue(
                                    "dayOfMonth",
                                    value.filter((v) => v !== day)
                                  );
                                } else {
                                  form.setValue("dayOfMonth", [...value, day]);
                                }
                              }}
                            />
                          ))}
                        </Row>
                      ))}
                    </Column>
                  );
                }}
              />
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
                label={t("how often")}
                type="number"
                inputProps={{ step: 1 }}
              />
              <ExperimentalFormTextField
                form={form}
                name="postpone.duration"
                type="number"
                label={t("how many days")}
                inputProps={{ step: 1 }}
              />
            </>
          )}
          <FormControl margin="normal">
            <Button testId="form schedule form submit button" type="submit">
              Save
            </Button>
          </FormControl>
        </Column>
        <Divider orientation="vertical" flexItem={true} sx={{ ml: 3, mr: 3 }} />
        <Controller
          control={form.control}
          name="times"
          rules={{
            validate: {
              minLength: (times) =>
                times.length > 0 || t("value required", { value: t("times") }),
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
                        value={time}
                        onChange={(e) => {
                          const time = e.currentTarget.value;
                          times[i] = time;
                          onChange(times);
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
      </Row>
    </Form>
  );
};
