/* global document */

import 'Source/layouts/base';
import initSearchRoomPage from 'Blocks/search-room-page/search-room-page';

function handleDOMLoaded() {
  initSearchRoomPage();
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
