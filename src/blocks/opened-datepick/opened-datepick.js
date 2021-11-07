/* global document */

import Datepicker from 'Source/libs/air-datepicker/Datepicker';

import './opened-datepick.scss';

const DATEPICKER_CONFIG = {
  inline: true,
};

function initOpenedDatepick() {
  const items = document.querySelectorAll('.js-opened-datepick');

  items.forEach((item) => {
    const datepicker = new Datepicker(item, DATEPICKER_CONFIG);

    datepicker.init();
  });
}

export default initOpenedDatepick;
