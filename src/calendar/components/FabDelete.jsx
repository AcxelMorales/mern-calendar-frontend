import { useSelector } from 'react-redux';

import { useCalendarStore } from '../../hooks';

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const { activeEvent } = useSelector((state) => state.calendar);

  const handleDelete = () => {
    startDeletingEvent(activeEvent);
  };

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      style={{
        display: hasEventSelected ? '' : 'none',
        zIndex: 99999,
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
