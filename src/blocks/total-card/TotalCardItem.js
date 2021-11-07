/* global $ */

import Datepicker from 'Source/libs/air-datepicker/Datepicker';
import { num2str } from 'Source/utils';

class TotalCardItem {
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

    const datepickerConfig = {
      range: true,
      minDate: new Date(),
      onSelect(date) {
        const dates = date.split(',');
        const [arrivalDate, departureDate] = dates;

        arrivalInput.value = arrivalDate ? arrivalDate : '';
        departureInput.value = departureDate ? departureDate : '';
      },
      onHide: this._handleDatepickerHide,
    };

    const datepicker = new Datepicker(arrivalInput, datepickerConfig);

    datepicker.init();

    this.datepicker = $(arrivalInput).datepicker().data('datepicker');

    arrivalPlace.addEventListener('click', datepicker.handleContextElementShow);
    departurePlace.addEventListener('click', datepicker.handleContextElementShow);
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

    const areValuesUndefined = !(departureInput.value && arrivalInput.value);

    if (areValuesUndefined) return;

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

export default TotalCardItem;
