import { useCalendarContext } from '@modules/calendar/contexts';
import { Row } from '@modules/core/components';
import { FormControlLabel, Checkbox, useTheme } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface CalendarSelectProps {}

export const CalendarSelect : React.FC<CalendarSelectProps>= ({
  
}) => {
  const { t } = useTranslation();
  const { ultraLight } = useTheme();
  const {
    showAppointments,
    showTasks,
    setShowAppointments,
    setShowTasks,
  } = useCalendarContext();

  return (
    <Row 
      justifyContent={"center"} 
      paddingY={0.5} 
      width={"100%"}
      sx={{backgroundColor: ultraLight}}>
      <FormControlLabel
        label={t("appointments")}
        control={
          <Checkbox 
            checked={showAppointments} 
            onChange={() => setShowAppointments(!showAppointments)} />
        }
      />
      <FormControlLabel
        label={t("tasks")}
        control={
          <Checkbox 
            checked={showTasks} 
            onChange={() => setShowTasks(!showTasks)} />
        }
      />
    </Row>
  );
};