/* global $ */

import {
  airDatepickerConfig,
  hideByApply,
  handleContextElementShow,
  num2str,
} from 'Root/utils';

class TotalCard {
  constructor(totalCard, selector) {
    this.totalCard = totalCard;
    this.selector = selector;
    this.output = {};

    this._handleDatepickerHide = this._handleDatepickerHide.bind(this);
  }

  init() {
    const { totalCard, selector, output } = this;

    const price = totalCard.querySelector(`.${selector}__price`).textContent.replace(/\s/g, '');

    this.arrivalPlace = totalCard.querySelector('.js-twin-datepick__output_arrival');
    this.departurePlace = totalCard.querySelector('.js-twin-datepick__output_departure');
    this.arrivalInput = this.arrivalPlace.querySelector('[name=dateArrival]');
    this.departureInput = this.departurePlace.querySelector('[name=dateDeparture]');

    this.cost = parseInt(price, 10);
    this.currency = price.replace(/\d/g, '');

    output.root = totalCard.querySelector(`.${selector}__product`);
    output.cost = output.root.querySelector(`.${selector}__cost`);
    output.duration = output.root.querySelector(`.${selector}__duration`);
    output.durationCost = output.root.querySelector(`.${selector}__duration-cost`);

    this.total = totalCard.querySelector(`.${selector}__total-cost`);

    this._initTwinDatepicker();

    output.cost.textContent = `${this.cost.toLocaleString('ru')}${this.currency}`;

    const date = new Date();
    date.setDate(date.getDate() + 4);

    this.datepicker.selectDate([new Date(), date]);
  }

  _initTwinDatepicker() {
    const {
      arrivalInput,
      departureInput,
      arrivalPlace,
      departurePlace,
    } = this;

    $(arrivalInput).datepicker({
      range: true,
      minDate: new Date(),
      onSelect: function onSelect(date) {
        const dates = date.split(',');
        arrivalInput.value = dates[0] ? dates[0] : '';
        departureInput.value = dates[1] ? dates[1] : '';
      },
      onHide: this._handleDatepickerHide,
      ...airDatepickerConfig,
    });

    this.datepicker = $(arrivalInput).datepicker().data('datepicker');

    arrivalPlace.addEventListener('click', handleContextElementShow.bind(this.datepicker));
    departurePlace.addEventListener('click', handleContextElementShow.bind(this.datepicker));

    hideByApply.call(this.datepicker);
  }

  _handleDatepickerHide() {
    const {
      arrivalInput,
      departureInput,
      output,
      cost,
      currency,
      total,
    } = this;

    if (!(departureInput.value && arrivalInput.value)) return;

    const departureDate = this._convertStringToDate(departureInput.value);
    const arrivalDate = this._convertStringToDate(arrivalInput.value);

    const days = ((((departureDate - arrivalDate) / 1000) / 60) / 60) / 24;

    output.duration.textContent = `${days} ${num2str(days, ['сутки', 'суток', 'суток'])}`;
    output.durationCost.textContent = `${cost * days}${currency}`;

    total.textContent = `${cost * days - 2179 + 300}${currency}`;
  }

  _convertStringToDate(str) {
    const arr = str.split('.').reverse();

    arr[1] -= 1;

    return new Date(...arr);
  }
}

export default TotalCard;
