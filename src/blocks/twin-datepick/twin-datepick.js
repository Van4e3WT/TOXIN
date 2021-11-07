/* global document */

import TwinDatepickItem from './TwinDatepickItem';

import './twin-datepick.scss';

function initTwinDatepick() {
  const twinDatepickers = document.querySelectorAll('.js-twin-datepick');

  twinDatepickers.forEach((item) => {
    const twinDatepickItem = new TwinDatepickItem(item);

    twinDatepickItem.init();
  });
}

export default initTwinDatepick;
