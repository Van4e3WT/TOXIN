import Datepicker from 'Source/libs/air-datepicker/Datepicker';

const DATEPICKER_CONFIG = {
  range: true,
  dateFormat: 'dd M',
  multipleDatesSeparator: ' - ',
  minDate: new Date(),
};

class DateSoloRangeItem {
  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  init() {
    const { rootElement } = this;
    const input = rootElement.querySelector('.js-date-solo-range__input');
    const datepicker = new Datepicker(input, DATEPICKER_CONFIG);

    datepicker.init();

    rootElement.addEventListener('click', datepicker.handleContextElementShow);
  }
}

export default DateSoloRangeItem;
