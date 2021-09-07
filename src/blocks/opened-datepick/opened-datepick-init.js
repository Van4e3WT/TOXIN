/* global $ */

import { airDatepickerConfig, hideByApply } from 'Root/utils';

import './opened-datepick.scss';

$('.js-opened-datepick').each((i, el) => {
  $(el).datepicker({
    inline: true,
    ...airDatepickerConfig,
  });

  hideByApply.call($(el).data('datepicker'));
});
