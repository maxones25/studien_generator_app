import { useCalendarContext } from '@modules/calendar/contexts';
import { Row } from '@modules/core/components';
import { FormControlLabel, Checkbox, useTheme, styled } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  "& .MuiFormControlLabel-label" : {
    fontSize: ".95rem",
  }
}))

export interface CalendarSelectProps {}

export const CalendarSelect : React.FC<CalendarSelectProps>= ({
  
}) => {
  const { t } = useTranslation();
  const { palette: { primary } } = useTheme();
  const {
    showAppointments,
    showTasks,
    setShowAppointments,
    setShowTasks,
  } = useCalendarContext();

  return (
    <Row 
      justifyContent={"center"} 
      paddingY={0.25} 
      width={"100%"}
      boxShadow={1}
      sx={{
        backgroundColor: primary.light

      }}
    >
      <StyledFormControlLabel
        label={t("appointments")}
        control={
          <Checkbox 
            checked={showAppointments} 
            onChange={() => setShowAppointments(!showAppointments)} />
        }
      />
      <StyledFormControlLabel
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