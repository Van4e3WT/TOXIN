/* global document */

import TwinDatepickItem from './TwinDatepickItem';

import './twin-datepick.scss';

function handleDOMLoaded() {
  const twinDatepickers = document.querySelectorAll('.js-twin-datepick');

  twinDatepickers.forEach((item) => {
    const twinDatepickItem = new TwinDatepickItem(item);

    twinDatepickItem.init();
  });
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
