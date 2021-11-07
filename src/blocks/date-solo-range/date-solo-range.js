/* global document */

import DateSoloRangeItem from './DateSoloRangeItem';

import './date-solo-range.scss';

function initDateSoloRange() {
  const items = document.querySelectorAll('.js-date-solo-range');

  items.forEach((item) => {
    const dateSoloRangeItem = new DateSoloRangeItem(item);

    dateSoloRangeItem.init();
  });
}

export default initDateSoloRange;
