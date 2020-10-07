//############# header-burger #############

$(".header__burger").on("click", () => $(".header__burger, .header__section").toggleClass("active"));

$(".header__section a").on("click", () => $(".header__burger, .header__section").removeClass("active"));

//############# landing__calendar-datepicker #############

$("#dateArrival").datepicker({
    clearButton: true,
    todayButton: true,
    minDate: new Date(),
});
dateDeparture.onclick = () => $("#dateArrival").datepicker().data('datepicker').show();

//############# landing__guests #############

guests.onclick = () => $(".dropdown-list").toggleClass("active");