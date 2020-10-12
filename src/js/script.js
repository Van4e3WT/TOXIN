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

//функция словоформы для массива из трёх возможных вариантов (один/одна, два/две, много)
function num2str(n, text_forms) {
    n = Math.abs(n) % 100; var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}