import initRoomCard from 'Blocks/room-card/room-card';
import initRegisterCard from 'Blocks/register-card/register-card';
import initLandingCard from 'Blocks/landing-card/landing-card';
import initOpenedDatepick from 'Blocks/opened-datepick/opened-datepick';
import initTotalCard from 'Blocks/total-card/total-card';
import 'Blocks/login-card/login-card';
import 'Blocks/svg-ui/svg-ui';

import './cards.scss';

function initCards() {
  initRoomCard();
  initRegisterCard();
  initLandingCard();
  initOpenedDatepick();
  initTotalCard();
}

export default initCards;
