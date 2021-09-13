/* global document, $ */

import { airDatepickerConfig, hideByApply } from 'Root/utils';

import DateSoloMask from './DateSoloMask';

import './date-solo.scss';

function handleDOMLoaded() {
  const inputs = document.querySelectorAll('.js-date-solo__input');

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
