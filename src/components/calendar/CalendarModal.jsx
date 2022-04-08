import React, { useEffect } from 'react';
import { useState } from 'react';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';

import { uiCloseModal } from '../../actions/ui';
import {
  eventAddNew,
  eventClearActiveEvent,
  eventUpdated,
} from '../../actions/events';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const endVal = now.clone().add(1, 'hours');

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: endVal.toDate(),
};

export const CalendarModal = () => {
  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(endVal.toDate());

  const [formValues, setFormValues] = useState(initEvent);

  const [titleValid, setTitleValid] = useState(true);

  const { title, notes, start, end } = formValues;

  const dispatch = useDispatch();
  const { modalOpen } = useSelector(({ ui }) => ui);
  const { activeEvent } = useSelector(({ calendar }) => calendar);

  useEffect(() => {
    activeEvent ? setFormValues(activeEvent) : setFormValues(initEvent);
  }, [activeEvent, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        'Error',
        'La fecha fin debe de ser mayor a la fecha de inicio',
        'error'
      );
    }

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    if (activeEvent) {
      dispatch(eventUpdated(formValues));
    } else {
      dispatch(
        eventAddNew({
          ...formValues,
          id: new Date().getTime(),
          user: {
            _id: '123',
            name: 'Acxel',
          },
        })
      );
    }

    setTitleValid(true);
    closeModal();
  };

  const closeModal = () => {
    setFormValues(initEvent);
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
  };

  const onChangeStartDate = (evt) => {
    setDateStart(evt);
    setFormValues({
      ...formValues,
      start: evt,
    });
  };

  const onChangeEndDate = (evt) => {
    setDateEnd(evt);
    setFormValues({
      ...formValues,
      end: evt,
    });
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1 style={{ marginLeft: '10px', marginBottom: '0px' }}>
        {' '}
        {!activeEvent ? 'Nuevo evento' : 'Editar evento'}{' '}
      </h1>
      <hr />
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={onChangeStartDate}
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={onChangeEndDate}
            value={dateEnd}
            className="form-control"
            minDate={dateStart}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
