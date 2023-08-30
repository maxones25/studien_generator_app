import { FormSchedulePeriod } from '@admin/forms/configs/enums/FormSchedulePeriod';
import { FormSchedule } from '@admin/forms/configs/repositories/schedules.repository';
import { DaysOfMonth, DaysOfWeek, Task } from '@entities';
import { Injectable } from '@nestjs/common';
import datetime, { Time } from '@shared/modules/datetime/datetime';

@Injectable()
export class TasksCalculator {
  generate({
    duration,
    participantId,
    schedules,
    startDate,
  }: {
    participantId: string;
    schedules: FormSchedule[];
    startDate: Date;
    duration: number;
  }) {
    return schedules.flatMap(
      ({
        id: scheduleId,
        period,
        frequency,
        daysOfWeek,
        daysOfMonth,
        times: rawTimes,
        config: { formId },
      }) => {
        const times = datetime.parseTimes(rawTimes);

        if (period === FormSchedulePeriod.Day)
          return this.generateFixDay(
            formId,
            scheduleId,
            participantId,
            frequency,
            startDate,
            duration,
            times,
          );

        if (period === FormSchedulePeriod.Week)
          return this.generateFixWeek(
            formId,
            scheduleId,
            participantId,
            frequency,
            daysOfWeek,
            startDate,
            duration,
            times,
          );

        if (period === FormSchedulePeriod.Month)
          return this.generateFixMonth(
            formId,
            scheduleId,
            participantId,
            frequency,
            daysOfMonth,
            startDate,
            duration,
            times,
          );

        throw new Error();
      },
    );
  }

  public generateFixDay(
    formId: string,
    scheduleId: string,
    participantId: string,
    frequency: number,
    startDate: Date,
    duration: number,
    times: Time[],
  ) {
    return this.generateTasks(
      formId,
      scheduleId,
      participantId,
      startDate,
      duration,
      times,
      (_, i) => i % frequency === 0,
    );
  }

  public generateFixWeek(
    formId: string,
    scheduleId: string,
    participantId: string,
    frequency: number,
    daysOfWeek: DaysOfWeek,
    startDate: Date,
    duration: number,
    times: Time[],
  ) {
    const referenceMonday = datetime.getLastMonday(startDate);
    return this.generateTasks(
      formId,
      scheduleId,
      participantId,
      startDate,
      duration,
      times,
      (day) => {
        const weeks = datetime.weeksInBetween(referenceMonday, day);

        if (weeks % frequency !== 0) return false;

        const index = datetime.getDayOfWeekIndex(day);

        return daysOfWeek[index];
      },
    );
  }

  public generateFixMonth(
    formId: string,
    scheduleId: string,
    participantId: string,
    frequency: number,
    daysOfMonth: DaysOfMonth,
    startDate: Date,
    duration: number,
    times: Time[],
  ) {
    return this.generateTasks(
      formId,
      scheduleId,
      participantId,
      startDate,
      duration,
      times,
      (day) => {
        const months = datetime.monthsInBetween(startDate, day);

        if (months % frequency !== 0) return false;

        return daysOfMonth.includes(day.getDate());
      },
    );
  }

  private generateTasks(
    formId: string,
    scheduleId: string,
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
        this.generateTask({ formId, scheduleId, participantId, scheduledAt }),
      );
  }

  private generateTask({
    formId,
    scheduleId,
    participantId,
    scheduledAt,
  }: {
    formId: string;
    scheduleId: string;
    participantId: string;
    scheduledAt: Date;
  }) {
    const task = new Task();

    task.formId = formId;
    task.scheduleId = scheduleId;
    task.participantId = participantId;
    task.originalScheduledAt = scheduledAt;
    task.scheduledAt = scheduledAt;
    task.rescheduled = 0;

    return task;
  }
}
