/* global $ */

class DateSoloMask {
  constructor(input) {
    this.input = input;
  }

  init() {
    const { input } = this;

    input.addEventListener('input', this._handleFieldInput.bind(this));
    input.addEventListener('select', this._handleFieldSelect.bind(this));
    input.addEventListener('change', this._handleFieldChange.bind(this));
  }

  _handleFieldInput() {
    const { input } = this;

    const validatedInput = input.value.replace(/\D/g, '');
    const len = validatedInput.length;

    if (len < 3) {
      this._inputDay(validatedInput);
    } else if (len < 5) {
      this._inputMonth(validatedInput);
    } else {
      this._inputYear(validatedInput);
    }

    input.value = this.newValue;
  }

  _inputDay(str) {
    const res = str.split('');
    const [charFirst, charSecond] = res;

    if (res.length === 1) {
      res[0] = charFirst > 3 ? '' : charFirst;
    }

    if (res.length === 2 && parseInt(charFirst, 10) === 3) {
      res[1] = parseInt(charSecond, 10) > 1 ? '' : charSecond;
    } else if (res.length === 2 && parseInt(charFirst, 10) === 0) {
      res[1] = parseInt(charSecond, 10) < 1 ? '' : charSecond;
    }

    this.newValue = res.join('');
  }

  _inputMonth(str) {
    const res = str.split('');
    const [, , charFirst, charSecond] = res;

    if (res.length === 3) {
      res[2] = charFirst > 1 ? '' : charFirst;
    }

    if (res.length === 4 && parseInt(charFirst, 10) === 1) {
      res[3] = charSecond > 2 ? '' : charSecond;
    } else if (res.length === 4 && parseInt(charFirst, 10) === 0) {
      res[3] = charSecond < 1 ? '' : charSecond;
    }

    res.splice(2, 0, '.');
    this.newValue = res.join('');
  }

  _inputYear(str) {
    const res = str.split('');
    const [, , , , charFirst, charSecond] = res;

    if (res.length === 5) {
      res[4] = charFirst < 1 || charFirst > 2 ? '' : charFirst;
    }

    if (res.length === 6 && parseInt(charFirst, 10) === 1) {
      res[5] = charSecond < 9 ? '' : charSecond;
    } else if (res.length === 6 && parseInt(charFirst, 10) === 2) {
      res[5] = charSecond > 0 ? '' : charSecond;
    }

    res.splice(2, 0, '.');
    res.splice(5, 0, '.');
    this.newValue = res.join('');
  }

  _handleFieldChange() {
    const { input } = this;

    if (input.value.length !== 10) return;

    const dateArr = input.value.split('.').reverse().join('-');
    const datepicker = $(input).datepicker().data('datepicker');

    datepicker.selectDate(new Date(dateArr));
    datepicker.date = new Date(dateArr);
  }

  _handleFieldSelect() {
    const { input } = this;

    input.selectionStart = input.selectionEnd;
  }
}

export default DateSoloMask;
