import { parseISO } from 'date-fns';

export const convertDateEvents = (events = []) => {
  return events.map((evt) => {
    evt.start = parseISO(evt.start);
    evt.end = parseISO(evt.end);

    return evt;
  });
};
