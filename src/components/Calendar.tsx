import React, { useState } from 'react';
import { Grid, Typography, IconButton, Tooltip, ThemeProvider } from '@mui/material';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Today } from '@mui/icons-material';

import { useTheme } from '@mui/material';
import styled from '@mui/styled-engine';

interface CalendarProps {
  month: Date;
}

const Calendar = ({ month }: CalendarProps) => {
  const theme = useTheme();

  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentMonthLabel, setCurrentMonthLabel] = useState(format(month, 'MMMM yyyy'));

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const startDate = startOfMonth(currentMonth);
  const endDate = endOfMonth(currentMonth);
  const allDates = eachDayOfInterval({ start: startDate, end: endDate });

  const navigateToPreviousMonth = () => {
    const previousMonth = subMonths(currentMonth, 1);
    setCurrentMonth(previousMonth);
    setCurrentMonthLabel(format(previousMonth, 'MMMM yyyy'));
  };

  const navigateToNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    setCurrentMonth(nextMonth);
    setCurrentMonthLabel(format(nextMonth, 'MMMM yyyy'));
  };

  const navigateToCurrentMonth = () => {
    const currentMonth = new Date();
    setCurrentMonth(currentMonth);
    setCurrentMonthLabel(format(currentMonth, 'MMMM yyyy'));
  };

  const firstDayOfWeek = daysOfWeek.indexOf(format(startDate, 'EEEE')); // Encontra o índice do primeiro dia da semana no mês
  const lastDayOfWeek = daysOfWeek.indexOf(format(endDate, 'EEEE')); // Encontra o índice do último dia da semana no mês


  const CalendarContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  })

  const CalendarHeader = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  })

  const CalendarDay = styled(Grid)({
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease-in-out',
    minHeight: '80px',
  })

  const CalendarDayHeader = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  })

  const CalendarGrid = styled(Grid)({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)', // Cria 7 colunas iguais para os dias da semana
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
  })

  const renderDay = (date: Date) => {
    const formattedDate = format(date, 'dd');
    const isCurrentMonth = isSameMonth(date, month);

    return (
      <CalendarDay item xs={2} key={formattedDate} className={`${isCurrentMonth ? '' : ' disabled'}`}>
        <CalendarDayHeader>
          <Typography variant="h6">{formattedDate}</Typography>
          <Typography variant="caption" color="textSecondary">
          </Typography>
        </CalendarDayHeader>
      </CalendarDay>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CalendarContainer>
        <CalendarHeader>
          <Tooltip title="Previous Month">
            <IconButton onClick={navigateToPreviousMonth}>
              <ChevronLeft />
            </IconButton>
          </Tooltip>
          <Typography variant="h5">{currentMonthLabel}</Typography>
          <Tooltip title="Next Month">
            <IconButton onClick={navigateToNextMonth}>
              <ChevronRight />
            </IconButton>
          </Tooltip>
          <Tooltip title="Go to Current Month">
            <IconButton onClick={navigateToCurrentMonth}>
              <Today />
            </IconButton>
          </Tooltip>
        </CalendarHeader>
        <CalendarGrid>
          {daysOfWeek.map((day) => (
            <Grid item xs={'auto'} key={day}>
              <Typography variant="subtitle1">{day}</Typography>
            </Grid>
          ))}
          {Array.from({ length: firstDayOfWeek }, (_, index) => (
            <Grid item xs={'auto'} key={`empty-start-${index}`}>
              <CalendarDay />
            </Grid>
          ))}
          {allDates.map((date) => (
            <Grid item xs={'auto'} key={format(date, 'dd')}>
              {renderDay(date)}
            </Grid>
          ))}
          {Array.from({ length: daysOfWeek.length - 1 - lastDayOfWeek }, (_, index) => (
            <Grid item xs={'auto'} key={`empty-end-${index}`} style={{ opacity: 0.5 }}>
              <CalendarDay />
            </Grid>
          ))}
        </CalendarGrid>
      </CalendarContainer>
    </ThemeProvider>
  );
};

export default Calendar;
