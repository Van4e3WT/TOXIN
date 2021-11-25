/* global document */

import DateSoloRangeItem from './DateSoloRangeItem';

import './date-solo-range.scss';

function initDateSoloRange(constraintSelector) {
  const items = [];

  if (constraintSelector) {
    const constraints = document.querySelectorAll(constraintSelector);

    constraints.forEach((constraint) => {
      items.push(...constraint.querySelectorAll('.js-date-solo-range'));
    });
  } else {
    items.push(...document.querySelectorAll('.js-date-solo-range'));
  }

  items.forEach((item) => {
    const dateSoloRangeItem = new DateSoloRangeItem(item);

    dateSoloRangeItem.init();
  });
}

export default initDateSoloRange;
