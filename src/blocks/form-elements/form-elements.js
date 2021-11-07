import initDateSolo from 'Blocks/date-solo/date-solo';
import initDateSoloRange from 'Blocks/date-solo-range/date-solo-range';
import initDropdownAbsolute from 'Blocks/dropdown-absolute/dropdown-absolute';
import initDropdownRelative from 'Blocks/dropdown-relative/dropdown-relative';
import initLikeButton from 'Blocks/like-button/like-button';
import initComment from 'Blocks/comment/comment';
import initRangeSlider from 'Blocks/range-slider/range-slider';
import initTwinDatepick from 'Blocks/twin-datepick/twin-datepick';
import 'Blocks/form-subscribe/form-subscribe';
import 'Blocks/checkbox/checkbox';
import 'Blocks/radio-button/radio-button';
import 'Blocks/toggle-button/toggle-button';
import 'Blocks/rate-result/rate-result';
import 'Blocks/rate-button/rate-button';
import 'Blocks/button/button';
import 'Blocks/pagination/pagination';
import 'Blocks/bullet-list/bullet-list';
import 'Blocks/room-privilege/room-privilege';
import 'Blocks/svg-ui/svg-ui';

import './form-elements.scss';

function initFormElements() {
  initDateSolo();
  initDateSoloRange();
  initDropdownAbsolute();
  initDropdownRelative();
  initLikeButton();
  initComment();
  initRangeSlider();
  initTwinDatepick();
}

export default initFormElements;
