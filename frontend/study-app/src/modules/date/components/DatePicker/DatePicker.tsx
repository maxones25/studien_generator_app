import { Button, IconButton, Row } from '@modules/core/components';
import { useDateContext } from '@modules/date/contexts';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import React, { useState } from 'react';
import { DateDialog } from '..';

export interface DatePickerProps {}

export const DatePicker : React.FC<DatePickerProps>= ({
  
}) => {
  const { date, increase, decrease } = useDateContext();
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  return (
    <Row sx={{
      justifyContent: "center",
      paddingBottom: "0.5rem"
    }}>
      <IconButton 
        onClick={decrease}
        testId='remove-day-date-picker'
        Icon={<ArrowBack />}
      />
      <Button 
        sx={{
          ":hover": {
            cursor: "pointer"
          },
          minWidth: "10em",
          textAlign: "center",
          textTransform: 'none',
          fontSize: ".9em",
          borderWidth: "2px"
        }}
        onClick={handleClick}
        testId='button-date-picker'
        variant='outlined'
      >
        {date.format('LL')}
      </Button>
      <IconButton
        onClick={increase}
        testId='add-day-date-picker'
        Icon={<ArrowForward />}
      />
      <DateDialog open={open} onClose={handleClick}/>
    </Row>
  );
};