import { types } from '../types/types';

export const eventAddNew = (evt) => ({
  type: types.eventAddNew,
  payload: evt,
});

export const eventSetActive = (evt) => ({
  type: types.eventSetActive,
  payload: evt,
});

export const eventClearActiveEvent = () => ({
  type: types.eventClaerActiveEvent,
});

export const eventUpdated = (evt) => ({
  type: types.eventUpdated,
  payload: evt,
});

export const eventDeleted = () => ({
  type: types.eventDeleted,
});
