import { FormSchedulePeriod } from '@admin/forms/configs/enums/FormSchedulePeriod';
import { FormScheduleType } from '@admin/forms/configs/enums/FormScheduleType';
import { FormSchedule } from '@admin/forms/configs/repositories/schedules.repository';
import { DaysOfWeek, Task } from '@entities';
import { Injectable } from '@nestjs/common';
import datetime, { Time } from '@shared/modules/datetime/datetime';

type GenerateTasksOptions = {
  participantId: string;
  schedules: FormSchedule[];
  startDate: Date;
  duration: number;
};

const generateTask = ({
  formId,
  participantId,
  scheduledAt,
}: {
  formId: string;
  participantId: string;
  scheduledAt: Date;
}) => {
  const task = new Task();

  task.formId = formId;
  task.participantId = participantId;
  task.originalScheduledAt = scheduledAt;
  task.scheduledAt = scheduledAt;
  task.rescheduled = 0;
  task.postponable = false;

  return task;
};

function getMonday(d) {
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust for Sundays
  return new Date(d.setDate(diff));
}

@Injectable()
export class TasksCalculatorService {
  generate({
    duration,
    participantId,
    schedules,
    startDate,
  }: GenerateTasksOptions) {
    return schedules
      .map(
        ({
          type,
          period,
          frequency,
          daysOfWeek,
          times: rawTimes,
          config: { formId },
        }) => {
          if (type === FormScheduleType.Flexible) return [];

          const times = rawTimes.map((time) => {
            const [rawHours, rawMinutes] = time.split(':');
            const date = new Date();
            date.setHours(parseInt(rawHours), parseInt(rawMinutes));
            return {
              hours: date.getUTCHours(),
              minutes: date.getUTCMinutes(),
            };
          });

          if (period === FormSchedulePeriod.Day)
            return this.generateFixDay(
              formId,
              participantId,
              frequency,
              startDate,
              duration,
              times,
            );

          if (period === FormSchedulePeriod.Week)
            return this.generateFixWeek(
              formId,
              participantId,
              frequency,
              daysOfWeek,
              startDate,
              duration,
              times,
            );

          throw new Error();
        },
      )
      .reduce((arr, tasks) => [...arr, ...tasks], []);
  }

  public generateFixDay(
    formId: string,
    participantId: string,
    frequency: number,
    startDate: Date,
    duration: number,
    times: Time[],
  ) {
    return this.generateTasks(
      formId,
      participantId,
      startDate,
      duration,
      times,
      (_, i) => i % frequency === 0,
    );
  }

  public generateFixWeek(
    formId: string,
    participantId: string,
    frequency: number,
    daysOfWeek: DaysOfWeek,
    startDate: Date,
    duration: number,
    times: Time[],
  ) {
    const referenceMonday = getMonday(startDate);
    return this.generateTasks(
      formId,
      participantId,
      startDate,
      duration,
      times,
      (day) => {
        const daysDifference = Math.floor(
          (day.getTime() - referenceMonday.getTime()) / (1000 * 60 * 60 * 24),
        );

        const weeksDifference = Math.floor(daysDifference / 7);

        if (weeksDifference % frequency !== 0) {
          return false;
        }

        const index = (day.getDay() + 6) % 7;

        return daysOfWeek[index];
      },
    );
  }

  private generateTasks(
    formId: string,
    participantId: string,
    startDate: Date,
    duration: number,
    times: Time[],
    filter: (day: Date, i: number, arr: Date[]) => boolean,
  ) {
    return datetime
      .generateDays(startDate, duration)
      .filter(filter)
      .reduce<Date[]>((datetimes, day) => {
        return [
          ...datetimes,
          ...times.map((time) => datetime.addTime(day, time)),
        ];
      }, [])
      .map((scheduledAt) =>
        generateTask({ formId, participantId, scheduledAt }),
      );
  }
}
