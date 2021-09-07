/* global $ */

import 'air-datepicker/dist/js/datepicker.min';
import 'air-datepicker/dist/css/datepicker.min.css';

import { airDatepickerConfig as props, handleContextElementShow, hideByApply } from 'Root/utils';

import './datepicker-fork.scss';

const twinDatepickers = $('.js-twin-datepick');

twinDatepickers.each((index, value) => {
  const outputArrival = $(value).find('.js-twin-datepick__output_arrival');
  const outputDeparture = $(value).find('.js-twin-datepick__output_departure');
  const dateArrival = outputArrival.find('.js-twin-datepick__input');
  const dateDeparture = outputDeparture.find('.js-twin-datepick__input');

  dateArrival.datepicker({
    range: true,
    minDate: new Date(),
    onSelect: function onSelect(date) {
      const dates = date.split(',');
      dateArrival.val(dates[0] ? dates[0] : '');
      dateDeparture.val(dates[1] ? dates[1] : '');
    },
    ...props,
  });

  const data = dateArrival.data('datepicker');

  outputArrival.on('click', handleContextElementShow.bind(data));
  outputDeparture.on('click', handleContextElementShow.bind(data));
  dateDeparture.on('click', handleContextElementShow.bind(data));

  hideByApply.call(data);
});

$('.js-date-solo').each((i, el) => {
  $(el).datepicker({
    ...props,
  });

  hideByApply.call($(el).data('datepicker'));
});

$('.js-date-solo-range').each((i, el) => {
  const input = $(el).find('.js-date-solo-range__input');
  input.datepicker({
    range: true,
    dateFormat: 'dd M',
    multipleDatesSeparator: ' - ',
    minDate: new Date(),
    ...props,
  });

  hideByApply.call(input.data('datepicker'));

  el.addEventListener('click', handleContextElementShow.bind(input.data('datepicker')));
});

$('.js-opened-datepick').each((i, el) => {
  $(el).datepicker({
    inline: true,
    ...props,
  });

  hideByApply.call($(el).data('datepicker'));
});
