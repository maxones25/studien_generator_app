import {
  Column,
  DataListItem,
  IconButton,
  Row,
  Text,
} from "@modules/core/components";
import { Schedule, ScheduleDaysOfWeek } from "@modules/formConfigs/types";
import { FormScheduleDayOfMonth } from "@modules/groups/types";
import { Delete } from "@mui/icons-material";
import { Chip, ListItemButton } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const formatDayOfWeek = (dayOfWeek?: ScheduleDaysOfWeek): string[] => {
  if (!dayOfWeek) return [];
  return dayOfWeek
    .map((active, i) => {
      if (!active) return "-";
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
    })
    .filter((day) => day !== "-");
};

const formatDayOfMonth = (daysOfMonth?: FormScheduleDayOfMonth) => {
  if (!daysOfMonth) return "-";
  return daysOfMonth.sort((a, b) => (a < b ? -1 : 1)).join(", ");
};

export interface FormScheduleListItemProps {
  schedule: Schedule;
  isLast: boolean;
  onSelect: (schedule: Schedule) => void;
  onDelete: (schedule: Schedule) => void;
}

export const FormScheduleListItem: React.FC<FormScheduleListItemProps> = ({
  schedule,
  isLast,
  onSelect,
  onDelete,
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
                am {formatDayOfMonth(schedule.daysOfMonth)} des Monats
              </Text>
              <Text variant="caption">alle {schedule.frequency} Monate</Text>
            </Column>
          )
        )}
        <Row ml={1} flex={1} justifyContent="flex-end">
          {schedule.times.map((time, i) => (
            <Chip
              key={`${i}-${time}`}
              size="small"
              color="secondary"
              label={time}
              sx={{ ml: 0.5 }}
            />
          ))}
        </Row>
      </ListItemButton>
      <IconButton
        testId="delete schedule item button"
        Icon={<Delete />}
        onClick={() => onDelete(schedule)}
      />
    </DataListItem>
  );
};
