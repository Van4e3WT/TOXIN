/* global document */

import DateSoloRangeItem from './DateSoloRangeItem';

import './date-solo-range.scss';

function handleDOMLoaded() {
  const items = document.querySelectorAll('.js-date-solo-range');

  items.forEach((item) => {
    const dateSoloRangeItem = new DateSoloRangeItem(item);

    dateSoloRangeItem.init();
  });
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
