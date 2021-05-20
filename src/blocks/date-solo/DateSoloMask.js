/* global $ */

class DateSoloMask {
  constructor(input) {
    this.input = input;
  }

  init() {
    function cancelSelect() {
      this.input.selectionStart = this.input.selectionEnd;
    }

    this.input.addEventListener('input', this.inputListener.bind(this));
    this.input.addEventListener('select', cancelSelect.bind(this));
    this.input.addEventListener('change', this.setDate.bind(this));
  }

  inputListener() {
    const validatedInput = this.input.value.replace(/\D/g, '');
    const len = validatedInput.length;

    if (len < 3) {
      this.inputDay(validatedInput);
    } else if (len < 5) {
      this.inputMonth(validatedInput);
    } else {
      this.inputYear(validatedInput);
    }

    this.input.value = this.newValue;
  }

  inputDay(str) {
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

  inputMonth(str) {
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

  inputYear(str) {
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

  setDate() {
    const dateArr = this.input.value.split('.').reverse().join('-');
    const datepicker = $(this.input).datepicker().data('datepicker');

    datepicker.selectDate(new Date(dateArr));
    datepicker.date = new Date(dateArr);
  }
}

export default DateSoloMask;
