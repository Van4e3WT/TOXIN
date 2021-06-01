/* global $ */

class DateSoloMask {
  constructor(input) {
    this.input = input;
  }

  init() {
    this.input.addEventListener('input', this._handleFieldInput.bind(this));
    this.input.addEventListener('select', this._handleFieldSelect.bind(this));
    this.input.addEventListener('change', this._handleFieldChange.bind(this));
  }

  _handleFieldInput() {
    const validatedInput = this.input.value.replace(/\D/g, '');
    const len = validatedInput.length;

    if (len < 3) {
      this._inputDay(validatedInput);
    } else if (len < 5) {
      this._inputMonth(validatedInput);
    } else {
      this._inputYear(validatedInput);
    }

    this.input.value = this.newValue;
  }

  _inputDay(str) {
    const res = str.split('');

    if (res.length === 1) {
      res[0] = res[0] > 3 ? '' : res[0];
    }

    if (res.length === 2) {
      if (parseInt(res[0], 10) === 3) {
        res[1] = parseInt(res[1], 10) > 1 ? '' : res[1];
      } else if (parseInt(res[0], 10) === 0) {
        res[1] = parseInt(res[1], 10) < 1 ? '' : res[1];
      }
    }

    this.newValue = res.join('');
  }

  _inputMonth(str) {
    const res = str.split('');

    if (res.length === 3) {
      res[2] = res[2] > 1 ? '' : res[2];
    }

    if (res.length === 4) {
      if (parseInt(res[2], 10) === 1) {
        res[3] = res[3] > 2 ? '' : res[3];
      } else if (parseInt(res[2], 10) === 0) {
        res[3] = res[3] < 1 ? '' : res[3];
      }
    }

    res.splice(2, 0, '.');
    this.newValue = res.join('');
  }

  _inputYear(str) {
    const res = str.split('');

    if (res.length === 5) {
      res[4] = res[4] < 1 || res[4] > 2 ? '' : res[4];
    }

    if (res.length === 6) {
      if (parseInt(res[4], 10) === 1) {
        res[5] = res[5] < 9 ? '' : res[5];
      } else if (parseInt(res[4], 10) === 2) {
        res[5] = res[5] > 0 ? '' : res[5];
      }
    }

    res.splice(2, 0, '.');
    res.splice(5, 0, '.');
    this.newValue = res.join('');
  }

  _handleFieldChange() {
    if (this.input.value.length !== 10) return;

    const dateArr = this.input.value.split('.').reverse().join('-');
    const datepicker = $(this.input).datepicker().data('datepicker');

    datepicker.selectDate(new Date(dateArr));
    datepicker.date = new Date(dateArr);
  }

  _handleFieldSelect() {
    this.input.selectionStart = this.input.selectionEnd;
  }
}

export default DateSoloMask;
