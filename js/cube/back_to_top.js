$(() => {
    $('#fixed_btn').hide();

    $(window).on('scroll', () => {
        if ($(window).scrollTop() > 700) {
            $('#fixed_btn').show(600);
        }

        else {
            $('#fixed_btn').hide(600);
        }
    })

    $('#fixed_btn').on('click', function () {
        $('html,body').animate({
            scrollTop: 0
        }, 400, 'linear');
        $(this).hide();
    })
})