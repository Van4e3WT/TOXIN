/* global document */

import Datepicker from 'Root/libs/air-datepicker/Datepicker';

import DateSoloMask from './DateSoloMask';

import './date-solo.scss';

function handleDOMLoaded() {
  const inputs = document.querySelectorAll('.js-date-solo__input');

  inputs.forEach((item) => {
    const datepicker = new Datepicker(item);

    datepicker.init();

    const input = new DateSoloMask(item);

    input.init();
  });
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
