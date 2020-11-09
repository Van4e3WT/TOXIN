//############# header-burger #############

$(".header__burger").on("click", () => $(".header__burger, .header__section").toggleClass("active"));

$(".header__section a").on("click", () => $(".header__burger, .header__section").removeClass("active"));

//############# twin-datepick #############
var twinDatepickers = $(".twin-datepick")
$.each(twinDatepickers, function(index, value) {
    var dateArrival = $(value).find(".dateArrival")
    var dateDeparture = $(value).find(".dateDeparture")
    dateArrival.datepicker({
        clearButton: true,
        todayButton: true,
        minDate: new Date(),
    });
    $(dateDeparture).on("click", () => dateArrival.datepicker().data('datepicker').show());
})

//############# date-solo #############

$(".dateSolo").datepicker({
    clearButton: true,
    todayButton: true,
});

//############# date-solo-range #############

$(".dateSoloRange").datepicker({
    clearButton: true,
    todayButton: true,
    minDate: new Date(),
});

//############# opened-datepick #############
$(".opened-datepick").datepicker({
    inline: true,
    clearButton: true,
    todayButton: true,
});