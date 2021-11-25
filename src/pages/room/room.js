/* global document */

import 'Source/layouts/base';
import initRoomPage from 'Blocks/room-page/room-page';

function handleDOMLoaded() {
  initRoomPage();
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
