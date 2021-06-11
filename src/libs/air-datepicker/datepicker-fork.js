/* global $ */

import 'air-datepicker/dist/js/datepicker.min';
import 'air-datepicker/dist/css/datepicker.min.css';

import './datepicker-fork.scss';

const props = {
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

function handleContextElementShow() {
  this.show();
}

function handleContextElementHide() {
  this.hide();
}

function hideByApply() {
  const acceptBtn = this.nav.$buttonsContainer[0].firstChild;

  if (acceptBtn) {
    acceptBtn.addEventListener('click', handleContextElementHide.bind(this));
  }
}

const twinDatepickers = $('.js-twin-datepick');

twinDatepickers.each((index, value) => {
  const outputArrival = $(value).find('.js-twin-datepick__output_arrival');
  const outputDeparture = $(value).find('.js-twin-datepick__output_departure');
  const dateArrival = outputArrival.find('.js-twin-datepick__input');
  const dateDeparture = outputDeparture.find('.js-twin-datepick__input');

  dateArrival.datepicker({
    range: true,
    minDate: new Date(),
    onSelect: function onSelect(date) {
      const dates = date.split(',');
      dateArrival.val(dates[0] ? dates[0] : '');
      dateDeparture.val(dates[1] ? dates[1] : '');
    },
    ...props,
  });

  const data = dateArrival.data('datepicker');

  outputArrival.on('click', handleContextElementShow.bind(data));
  outputDeparture.on('click', handleContextElementShow.bind(data));
  dateDeparture.on('click', handleContextElementShow.bind(data));

  hideByApply.call(data);
});

$('.js-date-solo').each((i, el) => {
  $(el).datepicker({
    ...props,
  });

  hideByApply.call($(el).data('datepicker'));
});

$('.js-date-solo-range').each((i, el) => {
  const input = $(el).find('.js-date-solo-range__input');
  input.datepicker({
    range: true,
    dateFormat: 'dd M',
    multipleDatesSeparator: ' - ',
    minDate: new Date(),
    ...props,
  });

  hideByApply.call(input.data('datepicker'));

  el.addEventListener('click', handleContextElementShow.bind(input.data('datepicker')));
});

$('.js-opened-datepick').each((i, el) => {
  $(el).datepicker({
    inline: true,
    ...props,
  });

  hideByApply.call($(el).data('datepicker'));
});
