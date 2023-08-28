import { Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { FC, useState } from "react";
import { StartDateForm, TimesForm } from "..";
import { useCounter } from "@modules/core/hooks";
import {
  Config,
  Schedule,
  ScheduleDaysOfMonth,
  ScheduleDaysOfWeek,
} from "@modules/formConfigs/types";
import { formatSchedule } from "@modules/formConfigs/utils";
import { useTranslation } from "react-i18next";
import { Button, Row } from "@modules/core/components";

export type StartStudyData = {
  startDate: string;
  configs: {
    id: string;
    schedules?: {
      id: string;
      times: string[];
      daysOfWeek?: ScheduleDaysOfWeek | undefined;
    }[];
  }[];
};

export interface StartStudyStepperProps {
  configs: Config[];

  onSubmit: (data: StartStudyData) => void;
}

export const StartStudyStepper: FC<StartStudyStepperProps> = ({
  configs,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const currentStep = useCounter();
  const [startDate, setStartDate] = useState<string>("");
  const [times, setTimes] = useState<
    {
      times: string[];
      daysOfWeek?: ScheduleDaysOfWeek;
      daysOfMonth?: ScheduleDaysOfMonth;
    }[][]
  >(() =>
    configs.map(
      (config) => config.schedules?.map(({ times }) => ({ times })) ?? []
    )
  );

  const handleSubmit = () => {
    const data = configs.map((config, i) => ({
      id: config.id,
      schedules: config.schedules?.map((schedule: Schedule, k: number) => ({
        id: schedule.id,
        ...times[i][k],
      })),
    }));
    onSubmit({ startDate, configs: data });
  };

  return (
    <Stepper activeStep={currentStep.value} orientation="vertical">
      <Step>
        <StepLabel>Startdatum eingeben</StepLabel>
        <StepContent>
          <StartDateForm
            onSubmit={({ startDate }) => {
              setStartDate(startDate);
              currentStep.increase();
            }}
            values={{ startDate }}
          />
        </StepContent>
      </Step>
      {configs.map((config, i) =>
        config.schedules?.map((schedule, k) => (
          <Step key={config.id}>
            <StepLabel>
              {config.form.name} | {formatSchedule(t, schedule)}
            </StepLabel>
            <StepContent>
              <TimesForm
                onSubmit={(data) => {
                  times[i][k] = {
                    times: data.times,
                    daysOfMonth: data.daysOfMonth,
                    daysOfWeek: data.daysOfWeek?.map((d) =>
                      Boolean(d)
                    ) as ScheduleDaysOfWeek,
                  };
                  setTimes([...times]);
                  currentStep.increase();
                }}
                onCancel={currentStep.decrease}
                schedule={schedule}
                values={{
                  times: times[i][k].times ? times[i][k].times : [],
                  daysOfMonth: (times[i][k].daysOfMonth
                    ? times[i][k].daysOfMonth
                    : undefined) as ScheduleDaysOfMonth,
                  daysOfWeek: (times[i][k].daysOfWeek
                    ? times[i][k].daysOfWeek
                    : undefined) as ScheduleDaysOfWeek,
                }}
              />
            </StepContent>
          </Step>
        ))
      )}
      <Step>
        <StepLabel>Fertig</StepLabel>
        <StepContent>
          <Row justifyContent="flex-end">
            <Button
              testId="go back"
              onClick={currentStep.decrease}
              size="small"
              color="primary"
            >
              {t("back")}
            </Button>
            <Button
              testId="start study"
              sx={{ ml: 1 }}
              size="small"
              onClick={handleSubmit}
            >
              Studie starten
            </Button>
          </Row>
        </StepContent>
      </Step>
    </Stepper>
  );
};
