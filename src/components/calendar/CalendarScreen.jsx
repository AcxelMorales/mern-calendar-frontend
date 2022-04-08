import React, { useState } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';

import { Navbar } from '../ui/Navbar';
import { AddNewFab } from '../ui/AddNewFab';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import { messages } from '../../helpers/calendar-messages-es';

moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );

  const dispatch = useDispatch();
  const { events } = useSelector(({ calendar }) => calendar);

  console.log(events);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    };

    return {
      style,
    };
  };

  const onDoubleClick = (evt) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (evt) => {
    dispatch(eventSetActive(evt));
  };

  const onViewChange = (evt) => {
    localStorage.setItem('lastView', evt);
    setLastView(evt);
  };

  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />

      <AddNewFab />

      <CalendarModal />
    </div>
  );
};
