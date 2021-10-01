/* global document */

import Datepicker from 'Root/libs/air-datepicker/Datepicker';

import './date-solo-range.scss';

const DATEPICKER_CONFIG = {
  range: true,
  dateFormat: 'dd M',
  multipleDatesSeparator: ' - ',
  minDate: new Date(),
};

function handleDOMLoaded() {
  const items = document.querySelectorAll('.js-date-solo-range');

  items.forEach((item) => {
    const input = item.querySelector('.js-date-solo-range__input');
    const datepicker = new Datepicker(input, DATEPICKER_CONFIG);

    datepicker.init();

    item.addEventListener('click', datepicker.handleContextElementShow);
  });
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
