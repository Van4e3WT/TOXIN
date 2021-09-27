/* global document, $ */

import { airDatepickerConfig, handleContextElementShow, hideByApply } from 'Root/utils';

import './twin-datepick.scss';

function handleDOMLoaded() {
  const twinDatepickers = $('.js-twin-datepick');

  twinDatepickers.each((index, item) => {
    const outputArrival = $(item).find('.js-twin-datepick__output_arrival');
    const outputDeparture = $(item).find('.js-twin-datepick__output_departure');
    const dateArrival = outputArrival.find('.js-twin-datepick__input');
    const dateDeparture = outputDeparture.find('.js-twin-datepick__input');

    dateArrival.datepicker({
      range: true,
      minDate: new Date(),
      onSelect: function onSelect(date) {
        const dates = date.split(',');
        const [arrivalDate, departureDate] = dates;

        dateArrival.val(arrivalDate ? arrivalDate : '');
        dateDeparture.val(departureDate ? departureDate : '');
      },
      ...airDatepickerConfig,
    });

    const data = dateArrival.data('datepicker');

    outputArrival.on('click', handleContextElementShow.bind(data));
    outputDeparture.on('click', handleContextElementShow.bind(data));

    hideByApply.call(data);
  });
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
