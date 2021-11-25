/* global document */

import DateSoloItem from './DateSoloItem';

import './date-solo.scss';

function initDateSolo(constraintSelector) {
  const inputs = [];

  if (constraintSelector) {
    const constraints = document.querySelectorAll(constraintSelector);

    constraints.forEach((constraint) => {
      inputs.push(...constraint.querySelectorAll('.js-date-solo__input'));
    });
  } else {
    inputs.push(...document.querySelectorAll('.js-date-solo__input'));
  }

  inputs.forEach((item) => {
    const dateSoloItem = new DateSoloItem(item);

    dateSoloItem.init();
  });
}

export default initDateSolo;
