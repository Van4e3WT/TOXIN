/* global $ */
const props = {
  clearButton: true,
  todayButton: true,
  language: {
    today: 'Применить',
  },
  navTitles: {
    days: 'MM yyyy',
  },
  prevHtml: '<svg><path d="M 16,7 l -10,10 l 10,10"></path><path d="M 6,17 l 20,0"></path></svg>',
  nextHtml: '<svg><path d="M 16,7 l 10,10 l -10,10"></path><path d="M 26,17 l -20,0"></path></svg>',
};

function contextShow() {
  this.show();
}

function contextHide() {
  this.hide();
}

function HideByApply() {
  const acceptBtn = this.nav.$buttonsContainer[0].firstChild;
  if (acceptBtn) {
    acceptBtn.addEventListener('click', contextHide.bind(this));
  }
}

const twinDatepickers = $('.twin-datepick');

twinDatepickers.each((index, value) => {
  const dateArrival = $(value).find('.date-arrival');
  const dateDeparture = $(value).find('.date-departure');

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

  $(dateDeparture).on('click', contextShow.bind(dateArrival.data('datepicker')));

  HideByApply.bind(dateArrival.data('datepicker'))();
});

$('.js-date-solo').each((i, el) => {
  $(el).datepicker({
    ...props,
  });

  HideByApply.bind($(el).data('datepicker'))();
});

$('.js-date-solo-range').each((i, el) => {
  $(el).datepicker({
    range: true,
    dateFormat: 'dd M',
    multipleDatesSeparator: ' - ',
    minDate: new Date(),
    ...props,
  });

  HideByApply.bind($(el).data('datepicker'))();
});

$('.js-opened-datepick').each((i, el) => {
  $(el).datepicker({
    inline: true,
    ...props,
  });

  HideByApply.bind($(el).data('datepicker'))();
});
