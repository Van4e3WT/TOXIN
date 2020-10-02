//############# header-burger #############
function removeActive() {
    $(".header__burger, .header__section").removeClass("active");
}

$(".header__burger").on("click", function(e) {
    e.PreventDefault;
    $(".header__burger, .header__section").toggleClass("active");
});

$(".header__section a").on("click", removeActive());

$(window).on("resize",function (){
    if ($(this).width() > 1250) {
        removeActive();
    }
});

//############# calendar-datepicker #############

$(".datepicker-here").datepicker({
    minDate: new Date(),
    clearButton: true,
    todayButton: true,
});