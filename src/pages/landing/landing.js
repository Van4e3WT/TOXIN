/* global document */

import 'Source/layouts/base';
import initLandingPage from 'Blocks/landing-page/landing-page';

function handleDOMLoaded() {
  initLandingPage();
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
