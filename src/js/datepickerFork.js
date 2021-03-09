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

const twinDatepickers = $('.twin-datepick');

twinDatepickers.each(function (index, value) {
  const dateArrival = $(value).find('.dateArrival');
  const dateDeparture = $(value).find('.dateDeparture');

  dateArrival.datepicker({
    minDate: new Date(),
    onSelect: function (date) {
      const dates = date.split(',');
      dateArrival.val(dates[0] ? dates[0] : '');
      dateDeparture.val(dates[1] ? dates[1] : '');
    },
    ...props,
  });

  $(dateDeparture).on('click', () => dateArrival.data('datepicker').show());

  const acceptBtn = dateArrival.data('datepicker').nav.$buttonsContainer[0].firstChild;
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => dateArrival.data('datepicker').hide());
  }
});

$('.dateSolo').each((i, el) => {
  $(el).datepicker({
    ...props,
  });

  const acceptBtn = $(el).data('datepicker').nav.$buttonsContainer[0].firstChild;
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => $(el).data('datepicker').hide());
  }
});

$('.dateSoloRange').each((i, el) => {
  $(el).datepicker({
    minDate: new Date(),
    ...props,
  });

  const acceptBtn = $(el).data('datepicker').nav.$buttonsContainer[0].firstChild;
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => $(el).data('datepicker').hide());
  }
});

$('.opened-datepick').each((i, el) => {
  $(el).datepicker({
    inline: true,
    ...props,
  });

  const acceptBtn = $(el).data('datepicker').nav.$buttonsContainer[0].firstChild;
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => $(el).data('datepicker').hide());
  }
});