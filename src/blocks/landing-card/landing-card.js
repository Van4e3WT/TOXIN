import initDropdownAbsolute from 'Blocks/dropdown-absolute/dropdown-absolute';
import initTwinDatepick from 'Blocks/twin-datepick/twin-datepick';
import 'Blocks/button/button';

import './landing-card.scss';

function initLandingCard() {
  initDropdownAbsolute('.js-landing-card');
  initTwinDatepick('.js-landing-card');
}

export default initLandingCard;
