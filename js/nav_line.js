$(() => {
    let navTopDistance = $('.nav_line').offset().top;

    $(window).on('scroll', () => { $(window).scrollTop() >= navTopDistance ? $('header').css({ position: 'fixed', top: 0 }) : $('header').css({ position: 'absolute', top: navTopDistance }) })

    $('.nav_list').hover(function () {
        $(this).children('ul').stop().slideToggle(400);
    });
});