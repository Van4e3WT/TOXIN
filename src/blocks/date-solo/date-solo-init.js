/* global document */
import DateSoloMask from './DateSoloMask';

function init() {
  const inputs = document.querySelectorAll('.js-date-solo');

  inputs.forEach((item) => {
    const input = new DateSoloMask(item);
    input.init();
  });
}

document.addEventListener('DOMContentLoaded', init);
