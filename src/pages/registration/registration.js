/* global document */

import 'Source/layouts/base';
import initRegistrationPage from 'Blocks/registration-page/registration-page';

function handleDOMLoaded() {
  initRegistrationPage();
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
