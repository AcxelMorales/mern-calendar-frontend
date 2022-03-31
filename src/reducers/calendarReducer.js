import moment from 'moment';
import { types } from '../types/types';

const initialState = {
  events: [
    {
      title: 'Cumpleaños del jefe',
      start: moment().toDate(),
      end: moment().add(2, 'hours').toDate(),
      bgColor: '#fafafa',
      notes: 'Tomar cerveza 🍺',
      user: {
        _id: 'XXX',
        name: 'Acxel',
      },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      console.log(action)
      return {
        ...state,
        activeEvent: action.payload
      };
    default:
      return state;
  }
};
