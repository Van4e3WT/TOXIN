import initDateSoloRange from 'Blocks/date-solo-range/date-solo-range';
import initDropdownAbsolute from 'Blocks/dropdown-absolute/dropdown-absolute';
import initDropdownRelative from 'Blocks/dropdown-relative/dropdown-relative';
import initRangeSlider from 'Blocks/range-slider/range-slider';
import 'Blocks/checkbox/checkbox';

import './search-filter.scss';

function initSearchFilter() {
  initDateSoloRange('.js-search-filter');
  initDropdownAbsolute('.js-search-filter');
  initDropdownRelative('.js-search-filter');
  initRangeSlider('.js-search-filter');
}

export default initSearchFilter;
