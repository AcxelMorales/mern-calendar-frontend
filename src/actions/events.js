import { types } from '../types/types';

export const eventAddNew = (evt) => ({
  type: types.eventAddNew,
  payload: evt,
});

export const eventSetActive = (evt) => ({
  type: types.eventSetActive,
  payload: evt,
});
