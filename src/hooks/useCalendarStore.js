import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store';

import { calendarApi } from '../api';

import { convertDateEvents } from '../helpers';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }

      const { data: {evento: {id}} } = await calendarApi.post('/events', calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id, user }));
    } catch (error) {
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
    }
  };

  const startDeletingEvent = async ({id}) => {
    try {
      await calendarApi.delete(`/events/${id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }
  };

  const startLoadingEvents = async () => {
    try {
      const {data: {eventos}} = await calendarApi.get('/events');
      const events = convertDateEvents(eventos);

      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
    startLoadingEvents,
  };
};
