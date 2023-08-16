import React, { useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  useTheme,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress
} from '@mui/material';
import { Column, Text } from '@modules/core/components';
import { useCalendarContext } from '@modules/calendar/contexts';
import { useDateContext } from '@modules/date/contexts';
import { useNavigationHelper } from '@modules/core/hooks';
import { getClosestDate } from '@modules/calendar/utils';
import { CalendarDateListItem } from '..';
import { useTranslation } from 'react-i18next';

type DateRefsType = {
  [key: string]: React.RefObject<HTMLLIElement>;
};

export interface CalendarListProps {}

export const CalendarList: React.FC<CalendarListProps> = () => {
  const theme = useTheme();
  const { dates, isLoading } = useCalendarContext();
  const { t } = useTranslation();
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

  const hasItems = (dates?.length ?? 0) > 0;

  return (
    <Column alignItems="center" overflow="hidden">
      {isLoading ? (
        <CircularProgress sx={{ mt: 5 }} data-testid="loading calendar entries spinner" />
      ) : !hasItems ? (
        <Text pt={2}>{t(`no values`, {value: t('entries')})}</Text>
      ) : (
        <List sx={{ width: '100%', overflowY: 'auto' }} ref={containerRef}>
          {dates?.map(({ date, entries }) => (
            <ListItem ref={dateRefs[date.toISOString()]} key={date.toDateString()}>
              <Column width="100%">
                <ListItemText
                  onClick={() => handleClick(date)}
                  primary={dayjs(date).locale('de').format('LL')}
                />
                <Divider variant="fullWidth" sx={{ borderColor: theme.palette.grey[600] }} />
                <List>
                  {entries.map(item => (
                    <CalendarDateListItem key={item.id} item={item} />
                  ))}
                </List>
              </Column>
            </ListItem>
          ))}
        </List>
      )}
    </Column>
  );
};
