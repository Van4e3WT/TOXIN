/* global $ */

import { airDatepickerConfig, hideByApply, handleContextElementShow } from 'Root/utils';

import './date-solo-range.scss';

$('.js-date-solo-range').each((i, el) => {
  const input = $(el).find('.js-date-solo-range__input');
  input.datepicker({
    range: true,
    dateFormat: 'dd M',
    multipleDatesSeparator: ' - ',
    minDate: new Date(),
    ...airDatepickerConfig,
  });

  hideByApply.call(input.data('datepicker'));

  el.addEventListener('click', handleContextElementShow.bind(input.data('datepicker')));
});
