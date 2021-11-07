import initComments from 'Blocks/comments/comments';
import initTotalCard from 'Blocks/total-card/total-card';
import 'Blocks/collage/collage';
import 'Blocks/room-privilege/room-privilege';
import 'Blocks/circle-diagram/circle-diagram';
import 'Blocks/bullet-list/bullet-list';
import 'Blocks/free-cancel/free-cancel';

import './room-page.scss';

function initRoomPage() {
  initComments();
  initTotalCard();
}

export default initRoomPage;
