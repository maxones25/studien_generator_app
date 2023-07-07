import { IconButton, Row } from '@modules/core/components';
import { useDateContext } from '@modules/date/contexts';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import React from 'react';

export interface DatePickerProps {}

export const DatePicker : React.FC<DatePickerProps>= props => {
  const { value: date, increase, decrease } = useDateContext();

  return (
    <Row sx={{
      justifyContent: "center"
    }}>
      <IconButton 
        onClick={decrease}
        testId='remove-day-date-picker'
        Icon={<ArrowBack />}
      />
      {date.toDateString()}
      <IconButton
        onClick={increase}
        testId='add-day-date-picker'
        Icon={<ArrowForward />}
      />
    </Row>
  );
};