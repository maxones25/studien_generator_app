import {
  Column,
  DataListItem,
  IconButton,
  Row,
  Text,
} from "@modules/core/components";
import { Schedule } from "@modules/formConfigs/types";
import { formatDayOfMonth, formatDayOfWeek } from "@modules/formConfigs/utils";
import { Delete, Info } from "@mui/icons-material";
import { Chip, ListItemButton, Tooltip } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

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

  const infoText = [
    schedule.postpone ? t("postponable") : null,
    schedule.restrict ? t("restricted") : null,
  ]
    .filter((i) => i !== null)
    .join(", ");

  return (
    <DataListItem item={schedule} divider={!isLast} disablePadding>
      <ListItemButton onClick={() => onSelect(schedule)}>
        <Row>
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
          ) : type === "Fix" && period === "Month" ? (
            <Column>
              <Text variant="body2">
                am {formatDayOfMonth(schedule.daysOfMonth)} des Monats
              </Text>
              <Text variant="caption">alle {schedule.frequency} Monate</Text>
            </Column>
          ) : type === "Flexible" && period === "Week" ? (
            <Column>
              <Text variant="body2">
                {schedule.amount} mal {t(period)}
              </Text>
            </Column>
          ) : (
            type === "Flexible" &&
            period === "Month" && (
              <Column>
                <Text variant="body2">
                  {schedule.amount} mal {t(period)}
                </Text>
              </Column>
            )
          )}
          {infoText !== "" && <Tooltip title={infoText} sx={{ ml: 1 }}>
            <Info color="secondary" data-testid="show info" />
          </Tooltip>}
        </Row>
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
