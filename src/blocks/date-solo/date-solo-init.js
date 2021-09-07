/* global document, $ */

import { airDatepickerConfig, hideByApply } from 'Root/utils';

import DateSoloMask from './DateSoloMask';

function handleDOMLoaded() {
  const inputs = document.querySelectorAll('.js-date-solo');

  inputs.forEach((item) => {
    $(item).datepicker({
      ...airDatepickerConfig,
    });

    hideByApply.call($(item).data('datepicker'));

    const input = new DateSoloMask(item);

    input.init();
  });
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
