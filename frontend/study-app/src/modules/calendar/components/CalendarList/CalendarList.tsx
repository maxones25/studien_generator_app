import React, { useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  useTheme,
  ListItem,
  ListItemText,
  Divider,
  List as MList,
} from '@mui/material';
import { Column, List, Row, Text } from '@modules/core/components';
import { useCalendarContext } from '@modules/calendar/contexts';
import { useDateContext } from '@modules/date/contexts';
import { useNavigationHelper } from '@modules/core/hooks';
import { getClosestDate } from '@modules/calendar/utils';
import { CalendarDateListItem } from '..';
import { formatiOSDate } from '@modules/date/utils';

type DateRefsType = {
  [key: string]: React.RefObject<HTMLLIElement>;
};

export interface CalendarListProps {}

export const CalendarList: React.FC<CalendarListProps> = () => {
  const theme = useTheme();
  const { dates, isLoading, isError } = useCalendarContext();
  const containerRef = useRef<HTMLUListElement>(null);
  const { set, date } = useDateContext();
  const navigate = useNavigationHelper();
  
  const dateList = dates?.map(({ date }) => date.toISOString()) ?? [];
  const dateRefs: DateRefsType = dateList.reduce<DateRefsType>((acc, date) => {
    acc[date] = React.createRef<HTMLLIElement>();
    return acc;
  }, {});

  useEffect(() => {
    const closestDate = getClosestDate(dateList, date.toISOString());
    const closestDateRef = dateRefs[closestDate];
    if (containerRef.current && closestDateRef?.current) {
      const topPosition = closestDateRef.current.offsetTop;
      containerRef.current.scrollTop = topPosition;
    }
  }, [dates, date, dateRefs]);

  const handleClick = (date: Date) => {
    set(dayjs(date));
    navigate.to('../tasks');
  };

  return (
    <List title={'calendar entries'} isError={isError} isLoading={isLoading} ref={containerRef}>
      {dates?.map(({ date, entries }) => {
        const isCurrentDate = dayjs(date).isSame(new Date(), 'd');
        return (
          <ListItem 
            sx={{paddingY: 1}} 
            ref={dateRefs[date.toISOString()]} 
            key={date.toDateString()} 
          >
          <Column width="100%">
            <Row justifyContent={'space-between'}>
              <ListItemText
                onClick={() => handleClick(date)}
                primary={formatiOSDate(date)}
                sx={{
                  margin: '0px',
                  '& .MuiTypography-root': { fontSize: '0.95rem', color: isCurrentDate ? theme.palette.error.main : 'black'}
                }}
              />
              <Text fontSize={'0.9rem'} paddingRight={'16px'}>{isCurrentDate ? 'heute' : ''}</Text>
            </Row>
            <Divider variant="fullWidth" sx={{ borderColor: theme.palette.grey[600] }} />
            <MList disablePadding>
              {entries.map((item, i, arr) => (
                <CalendarDateListItem 
                key={item.id} item={item} divider={i < arr.length - 1}/>
                ))}
            </MList>
          </Column>
        </ListItem>
      )})}
    </List>
  );
};
