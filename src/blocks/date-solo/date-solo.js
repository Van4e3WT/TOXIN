/* global document */

import DateSoloItem from './DateSoloItem';

import './date-solo.scss';

function initDateSolo() {
  const inputs = document.querySelectorAll('.js-date-solo__input');

  inputs.forEach((item) => {
    const dateSoloItem = new DateSoloItem(item);

    dateSoloItem.init();
  });
}

export default initDateSolo;
