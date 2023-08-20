import { FormSchedulePeriod } from '@admin/groups/schedules/enums/FormSchedulePeriod';
import { FormScheduleType } from '@admin/groups/schedules/enums/FormScheduleType';
import { FormSchedule, Task } from '@entities';
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
        ({ type, period, frequency, times: rawTimes, config: { formId } }) => {
          if (type === FormScheduleType.Flexible) return [];

          const times = rawTimes.map((time) => {
            const [rawHours, rawMinutes] = time.split(':');
            return {
              hours: parseInt(rawHours),
              minutes: parseInt(rawMinutes),
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
    return datetime
      .generateDays(startDate, duration, times)
      .filter((_, i) => i % frequency === 0)
      .map((scheduledAt) =>
        generateTask({ participantId, scheduledAt, formId }),
      );
  }
}
