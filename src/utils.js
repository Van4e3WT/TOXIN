const airDatepickerConfig = {
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

function num2str(i, textForms) {
  const [one, two, many] = textForms;
  const n = Math.abs(i) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return many;
  if (n1 > 1 && n1 < 5) return two;
  if (n1 === 1) return one;

  return many;
}

function getGroupSum(items) {
  const values = items.map((item) => Number(item.root.dataset.value));
  return values.reduce((sum, value) => sum + value);
}

export {
  airDatepickerConfig,
  handleContextElementHide,
  handleContextElementShow,
  hideByApply,
  num2str,
  getGroupSum,
};
