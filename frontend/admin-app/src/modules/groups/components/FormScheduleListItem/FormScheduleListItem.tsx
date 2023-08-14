import {
  Column,
  DataListItem,
  IconButton,
  Text,
} from "@modules/core/components";
import {
  FormSchedule,
  FormScheduleDayOfMonth,
  FormScheduleDaysOfWeek,
} from "@modules/groups/types";
import { Delete } from "@mui/icons-material";
import { ListItemButton } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const formatDayOfWeek = (dayOfWeek: FormScheduleDaysOfWeek) => {
  return dayOfWeek
    .filter((active) => active)
    .map((_, i) => {
      switch (i) {
        case 0:
          return "mo";
        case 1:
          return "tu";
        case 2:
          return "we";
        case 3:
          return "th";
        case 4:
          return "fr";
        case 5:
          return "sa";
        case 6:
          return "su";
        default:
          return "-";
      }
    });
};

const formatDayOfMonth = (dayOfMonth: FormScheduleDayOfMonth) => {
  return dayOfMonth.map((day) => `${day}.`).join(", ");
};

export interface FormScheduleListItemProps {
  schedule: FormSchedule;
  isLast: boolean;
  onSelect: (schedule: FormSchedule) => void;
}

export const FormScheduleListItem: React.FC<FormScheduleListItemProps> = ({
  schedule,
  isLast,
  onSelect,
}) => {
  const { t } = useTranslation();
  const { type, period } = schedule;

  return (
    <DataListItem item={schedule} divider={!isLast} disablePadding>
      <ListItemButton onClick={() => onSelect(schedule)}>
        {type === "Fix" && period === "Day" ? (
          <Column>
            <Text variant="body2">alle {schedule.frequency} Tage</Text>
          </Column>
        ) : type === "Fix" && period === "Week" ? (
          <Column>
            <Text variant="body2">
              {formatDayOfWeek(schedule.daysOfWeek)
                .map((day) => t(day))
                .join(", ")}
            </Text>
            <Text variant="caption">alle {schedule.frequency} Wochen</Text>
          </Column>
        ) : (
          type === "Fix" &&
          period === "Month" && (
            <Column>
              <Text variant="body2">
                am {formatDayOfMonth(schedule.dayOfMonth)} des Monats
              </Text>
              <Text variant="caption">alle {schedule.frequency} Monate</Text>
            </Column>
          )
        )}
      </ListItemButton>
      <IconButton testId="delete schedule item button" Icon={<Delete />} />
    </DataListItem>
  );
};
