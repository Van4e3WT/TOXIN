import Datepicker from 'Source/libs/air-datepicker/Datepicker';

import DateSoloMask from './DateSoloMask';

class DateSoloItem {
  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  init() {
    const { rootElement } = this;
    const datepicker = new Datepicker(rootElement);

    datepicker.init();

    const input = new DateSoloMask(rootElement);

    input.init();
  }
}

export default DateSoloItem;
