/* global $ */

import 'air-datepicker/dist/js/datepicker.min';
import 'air-datepicker/dist/css/datepicker.min.css';

import './datepicker-fork.scss';

const DATEPICKER_DEFAULT_CONFIG = {
  clearButton: true,
  todayButton: true,
  language: {
    today: 'Применить',
  },
  navTitles: {
    days: 'MM yyyy',
  },
  prevHtml: '<svg><path d="M 13,10 l -7,7 l 7,7"></path><path d="M 6,17 l 16,0"></path></svg>',
  nextHtml: '<svg><path d="M 19,10 l 7,7 l -7,7"></path><path d="M 26,17 l -16,0"></path></svg>',
};

class Datepicker {
  constructor(rootElement, props) {
    this.props = props;
    this.rootElement = rootElement;

    this.handleContextElementShow = this.handleContextElementShow.bind(this);
  }

  init() {
    const { rootElement, props } = this;

    $(rootElement).datepicker({ ...DATEPICKER_DEFAULT_CONFIG, ...props });

    this._hideByApply();
  }

  handleContextElementShow() {
    const { rootElement } = this;
    const date = $(rootElement).data('datepicker');

    date.show();
  }

  _hideByApply() {
    const { rootElement } = this;
    const date = $(rootElement).data('datepicker');
    const acceptBtn = date.nav.$buttonsContainer[0].firstChild;

    if (acceptBtn) {
      acceptBtn.addEventListener('click', date.hide.bind(date));
    }
  }
}

export default Datepicker;
