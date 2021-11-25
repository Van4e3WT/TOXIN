/* global document */

import TwinDatepickItem from './TwinDatepickItem';

import './twin-datepick.scss';

function initTwinDatepick(constraintSelector) {
  const twinDatepickers = [];

  if (constraintSelector) {
    const constraints = document.querySelectorAll(constraintSelector);

    constraints.forEach((constraint) => {
      twinDatepickers.push(...constraint.querySelectorAll(('.js-twin-datepick')));
    });
  } else {
    twinDatepickers.push(...document.querySelectorAll('.js-twin-datepick'));
  }

  twinDatepickers.forEach((item) => {
    const twinDatepickItem = new TwinDatepickItem(item);

    twinDatepickItem.init();
  });
}

export default initTwinDatepick;
