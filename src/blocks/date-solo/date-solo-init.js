/* global document */
import DateSoloMask from './DateSoloMask';

function handleDOMLoaded() {
  const inputs = document.querySelectorAll('.js-date-solo');

  inputs.forEach((item) => {
    const input = new DateSoloMask(item);

    input.init();
  });
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
