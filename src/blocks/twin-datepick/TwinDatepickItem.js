import Datepicker from 'Root/libs/air-datepicker/Datepicker';

class TwinDatepickItem {
  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  init() {
    const { rootElement } = this;

    const outputArrival = rootElement.querySelector('.js-twin-datepick__output_arrival');
    const outputDeparture = rootElement.querySelector('.js-twin-datepick__output_departure');
    const dateArrival = outputArrival.querySelector('.js-twin-datepick__input');
    const dateDeparture = outputDeparture.querySelector('.js-twin-datepick__input');

    const datepickerConfig = {
      range: true,
      minDate: new Date(),
      onSelect(date) {
        const dates = date.split(',');
        const [arrivalDate, departureDate] = dates;

        dateArrival.value = arrivalDate ? arrivalDate : '';
        dateDeparture.value = departureDate ? departureDate : '';
      },
    };

    const datepicker = new Datepicker(dateArrival, datepickerConfig);

    datepicker.init();

    outputArrival.addEventListener('click', datepicker.handleContextElementShow);
    outputDeparture.addEventListener('click', datepicker.handleContextElementShow);
  }
}

export default TwinDatepickItem;
